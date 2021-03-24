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
app.get('/list-docs/:folder', async (req, res) => {
    const dir = req.params.folder
    try {
        const docsList = await helpers.listDocs(dir)
        res.status(200).send({ docsList })
    } catch (error) {
        console.error('Error on Get path >>> /list-docs/:dir', error)
        res.status(404).send({ error: `No se pudo obtener la lista de documentos` })
    }
})

app.get('/get-doc/:folder/:doc', async (req, res) => {
    const { folder:dir, doc:fileName } = req.params

    try {
        const invoiceData = await helpers.readDoc(dir, fileName)
        res.status(200).send(invoiceData)
    } catch (error) {
        console.error('Error on Get path >>> /get-doc/:folder/:doc', error)
        res.status(404).send({ error: `No se pudo obtener el documento ${fileName}` })
    }
})

app.post('/create-doc/:folder', async (req, res) => {
    const { folder:dir } = req.params
    const fileData = req.body

    try {
        const response = await helpers.creteDoc(dir, fileData)
        res.status(200).send(response)
    } catch (error) {
        console.error('Error on Post path >>> /create-doc/:folder', error)
        res.status(500).send({ error: `No se pudo crear el documento ${fileName}, es posible que ya exista` })
    }
})

app.put('/update-doc/:folder/:doc', async (req, res) => {
    const { folder:dir, doc:fileName } = req.params
    const fileData = req.body

    try {
        const response = await helpers.updateDoc(dir, fileName, fileData)
        res.status(200).send(response)
    } catch (error) {
        console.error('Error on Put path >>> /update-doc/:folder/:doc', error)
        res.status(500).send({ error: `No se pudo actualizar el documento ${fileName}` })
    }
})

app.delete('/delete-doc/:folder/:doc', async (req, res) => {
    const { folder:dir, doc:fileName } = req.params
    try {
        const response = await helpers.deleteDoc(dir, fileName)
        res.status(200).send(response)
    } catch (error) {
        console.error('Error on Post path >>> /delete-doc/:folder/:doc', error)
        res.status(500).send({ error: `No se pudo borrar el documento ${fileName}` })
    }
})

app.delete('/delete-all-docs/:folder', async (req, res) => {
    const dir = req.params.folder

    try {
        const response = await helpers.deleteAllDocs(dir)
        res.status(200).send(response)
    } catch (error) {
        console.error('Error on Post path >>> /delete-all-docs/:folder', error)
        res.status(500).send({ error: `No se pudieron borrar los documentos` })
    }
})

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
        console.error('Error on Get path >>> /search-client-id/:id', error)
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
        console.error('Error on Get path >>> /search-client-name/:name', error)
        res.status(500).send({ error: 'No se pudo leer la base de datos' })
    }
})

// app.get('/get-all-products', async (req, res) => {
//     try {
//         const allProducts = await helpers.queryDB('products')
//         res.status(200).send(allProducts)
//     } catch (error) {
//         console.error('Error on Get path >>> /get-all-products', error)
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
        console.error('Error on Get path >>> /search-product-id/:id', error)
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
        console.error('Error on Get path >>> /search-product-terms/:terms', error)
        res.status(500).send({ error: 'No se pudo leer la base de datos' })
    }
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
