const path = require('path')
const express = require('express')
const cors = require('cors')
const compression = require('compression')
const app = express()
const helpers = require('./lib/helpers')
const startWorkers = require('./lib/workers')
const { getToken, postToken, putToken, deleteToken } = require('./controllers/tokens')
const { getDocList, getDocSingle, postCreateDoc, putUpdateDoc, deleteDocSingle, deleteDocAll } = require('./controllers/docs')
const { getDocSalesStats, getDocSequences } = require('./controllers/utils')

// IMPSRV IP 192.168.1.102
// SELF IP 192.168.1.5
const HOST_HTTP = process.env.NODE_ENV === 'production' ? '192.168.1.5' : 'localhost'
const PORT = process.env.PORT || 5000

// Serve Client Static Dir
//--GIT--> export NODE_ENV=production
//--CMD--> SET NODE_ENV=production
if (process.env.NODE_ENV === 'production') {
    app.use(compression())
    app.use(express.static(path.join(__dirname, '..', 'client/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'client/build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send({ welcome: 'Welcome to IMP Invoicing API' })
    })
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Auth routes
app.get('/tokens/:id', getToken)
app.post('/tokens', postToken)
app.put('/tokens', putToken)
app.delete('/tokens/:id', deleteToken)

// CRUD related routes
app.get('/list-docs/:folder/:doc?', getDocList)
app.get('/get-doc/:folder/:doc', getDocSingle)
app.post('/create-doc/:folder', postCreateDoc)
app.put('/update-doc/:folder/:doc', putUpdateDoc)
app.delete('/delete-doc/:folder/:doc', deleteDocSingle)
app.delete('/delete-all-docs/:folder', deleteDocAll)

// Utils routes
app.get('/doc-sales-stats', getDocSalesStats)
app.get('/doc-sequences', getDocSequences)
app.put('/update-sequence/:prop/:value', putUpdateSequence)

// Search DB related routes
app.get('/search-client-id/:query', async (req, res) => {
    const clientId = req.params.query

    try {
        const clientData = await helpers.queryDB('clients_by_id')
        const client = clientData[clientId] || null

        if (client !== null) {
            res.status(200).send([client])
        } else {
            res.status(404).send({ error: `ID de cliente no encontrada: ${clientId}` })
        }
    } catch (error) {
        console.error('Error on Get path >>> /search-client-id/:id', error.message)
        res.status(500).send({ error: 'No se pudo leer la base de datos' })
    }
})

app.get('/search-client-name/:query', async (req, res) => {
    const clientName = req.params.query

    try {
        const clientData = await helpers.queryDB('clients')
        const clients = clientData.filter(({ name }) => name.toLowerCase().includes(clientName.toLocaleLowerCase()))

        if (clients.length) {
            res.status(200).send(clients)
        } else {
            res.status(404).send({ error: `Nombre de cliente no encontrado: ${clientName}` })
        }
    } catch (error) {
        console.error('Error on Get path >>> /search-client-name/:name', error.message)
        res.status(500).send({ error: 'No se pudo leer la base de datos' })
    }
})

// app.get('/get-all-products', async (req, res) => {
//     try {
//         const allProducts = await helpers.queryDB('products')
//         res.status(200).send(allProducts)
//     } catch (error) {
//         console.error('Error on Get path >>> /get-all-products', error.message)
//         res.status(500).send({ error: 'No se pudo leer la base de datos' })
//     }
// })

app.get('/search-product-id/:query', async (req, res) => {
    const prodId = req.params.query

    try {
        const products = await helpers.queryDB('products_by_id')
        const product = products[prodId] || null

        if (product !== null) {
            res.status(200).send([product])
        } else {
            res.status(404).send({ error: `Codigo exacto de producto no encontrado: ${prodId}` })
        }
    } catch (error) {
        console.error('Error on Get path >>> /search-product-id/:id', error.message)
        res.status(500).send({ error: 'No se pudo leer la base de datos' })
    }
})

app.get('/search-product-includes/:query', async (req, res) => {
    const query = req.params.query
    const idRegx = new RegExp(`^${query.toLowerCase()}.*`)

    try {
        const products = await helpers.queryDB('products')
        const parcialCodes = products.filter(({ id }) => idRegx.test(id.toLowerCase()))
        const parcialNames = products.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()))
        const combinedResults = [ ...parcialCodes, ...parcialNames ]

        if (combinedResults.length) {
            res.status(200).send(combinedResults)
        } else {
            res.status(404).send({ error: `Codigo o nombre parcial de producto no encontrado: ${query}` })
        }
    } catch (error) {
        console.error('Error on Get path >>> /search-product-terms/:terms', error.message)
        res.status(500).send({ error: 'No se pudo leer la base de datos' })
    }
})

app.listen(PORT, () => {
  console.log(`App listening at http://${HOST_HTTP}:${PORT}`)
})

// Start the workers
startWorkers()
