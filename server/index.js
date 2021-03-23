const path = require('path')

const helpers = require('./lib/helpers')
const port = process.env.PORT || 5000

const express = require('express')
const app = express()

const cors = require('cors')

const compression = require('compression')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// export NODE_ENV=production
if (process.env.NODE_ENV === 'production') {
    app.use(compression())
    app.use(express.static(path.join(__dirname, '..', 'client/build')))
}

app.get('/', (req, res) => {
    res.send({ welcome: 'Welcome to IMP Invoicing' })
})

// CRUD related routes
app.get('/list-docs/:dir', async (req, res) => {
    const dir = req.params.dir
    try {
        const docsList = await helpers.listDocs(dir)
        res.status(200).send({ docsList })
    } catch (error) {
        console.error('Error on Get path >>> /list-docs/:dir', error)
        res.status(404).send({ Error: `Could not retrieve the ${dir} list` })
    }
})

app.get('/get-doc/:type/:num', async (req, res) => {
    const { type:dir, num:fileName } = req.params

    try {
        const invoiceData = await helpers.readDoc(dir, fileName)
        res.status(200).send(invoiceData)
    } catch (error) {
        console.error('Error on Get path >>> /get-doc/:type/:num', error)
        res.status(404).send({ Error: 'Could not get the requested document' })
    }
})

app.post('/create-doc/:type', async (req, res) => {
    const { type:dir } = req.params
    const fileData = req.body

    try {
        const response = await helpers.creteDoc(dir, fileData)
        res.status(200).send(response)
    } catch (error) {
        console.error('Error on Post path >>> /create-doc/:type', error)
        res.status(500).send({ Error: 'Could not create document, it may already exist' })
    }
})

app.put('/update-doc/:type/:num', async (req, res) => {
    const { type:dir, num:fileName } = req.params
    const fileData = req.body

    try {
        const response = await helpers.updateDoc(dir, fileName, fileData)
        res.status(200).send(response)
    } catch (error) {
        console.error('Error on Post path >>> /create-doc/:type', error)
        res.status(500).send({ Error: 'Could not create document, it may already exist' })
    }
})

app.delete('/delete-doc/:type/:num', async (req, res) => {
    const { type:dir, num:fileName } = req.params
    try {
        const response = await helpers.deleteDoc(dir, fileName)
        res.status(200).send(response)
    } catch (error) {
        console.error('Error on Post path >>> /delete-doc/:type/:num', error)
        res.status(500).send({ Error: 'Could not delete document, it may not exist' })
    }
})

app.delete('/delete-all-docs/:type', async (req, res) => {
    const dir = req.params.type

    try {
        const response = await helpers.deleteAllDocs(dir)
        res.status(200).send(response)
    } catch (error) {
        console.error('Error on Post path >>> /delete-all-docs/:type', error)
        res.status(500).send({ Error: `Could not delete documents in ${dir}` })
    }
})

// Search DB related routes
app.get('/search-client-id/:id', async (req, res) => {
    const clientId = req.params.id

    try {
        const clientData = await helpers.queryDB('clients_by_id')
        const client = clientData[clientId] || null

        if (client !== null) {
            res.status(200).send([client])
        } else {
            res.status(404).send({ Error: `ID de cliente no encontrada: ${clientId}` })
        }
    } catch (error) {
        console.error('Error on Get path >>> /search-client-id/:id', error)
        res.status(500).send({ Error: 'Could not read database' })
    }
})

app.get('/search-client-name/:name', async (req, res) => {
    const clientName = req.params.name

    try {
        const clientData = await helpers.queryDB('clients')
        const clients = clientData.filter(({ name }) => name.toLowerCase().includes(clientName.toLocaleLowerCase()))

        if (clients.length) {
            res.status(200).send(clients)
        } else {
            res.status(404).send({ Error: `Nombre de cliente no encontrado: ${clientName}` })
        }
    } catch (error) {
        console.error('Error on Get path >>> /search-client-name/:name', error)
        res.status(500).send({ Error: 'Could not read database' })
    }
})

// app.get('/get-all-products', async (req, res) => {
//     try {
//         const allProducts = await helpers.queryDB('products')
//         res.status(200).send(allProducts)
//     } catch (error) {
//         console.error('Error on Get path >>> /get-all-products', error)
//         res.status(500).send({ Error: 'Could not read database' })
//     }
// })

app.get('/search-product-id/:id', async (req, res) => {
    const prodId = req.params.id

    try {
        const products = await helpers.queryDB('products_by_id')
        const product = products[prodId] || null

        if (product !== null) {
            res.status(200).send([product])
        } else {
            res.status(404).send({ Error: `Codigo exacto de producto no encontrado: ${prodId}` })
        }
    } catch (error) {
        console.error('Error on Get path >>> /search-product-id/:id', error)
        res.status(500).send({ Error: 'Could not read database' })
    }
})

app.get('/search-product-terms/:terms', async (req, res) => {
    const terms = req.params.terms
    const idRegx = new RegExp(`^${terms.toLowerCase()}.*`)

    try {
        const products = await helpers.queryDB('products')
        const parcialCodes = products.filter(({ id }) => idRegx.test(id.toLowerCase()))
        const parcialNames = products.filter(({ name }) => name.toLowerCase().includes(terms.toLowerCase()))
        const combinedResults = [...parcialCodes, ...parcialNames]

        if (combinedResults.length) {
            res.status(200).send(combinedResults)
        } else {
            res.status(404).send({ Error: `Codigo o nombre parcial de producto no encontrado: ${terms}` })
        }
    } catch (error) {
        console.error('Error on Get path >>> /search-product-terms/:terms', error)
        res.status(500).send({ Error: 'Could not read database' })
    }
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
