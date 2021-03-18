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
        res.status(500).send({ Error: `Could not retrieve the ${dir} list` })
    }
})

app.get('/get-doc/:type/:num', async (req, res) => {
    const { type:dir, num:fileName } = req.params

    try {
        const invoiceData = await helpers.readDoc(dir, fileName)
        res.status(200).send(invoiceData)
    } catch (error) {
        console.error('Error on Get path >>> /get-doc/:type/:num', error)
        res.status(500).send({ Error: 'Could not get the requested document' })
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

// DB related routes
app.get('/get-client/:id', async (req, res) => {
    const clientId = req.params.id

    try {
        const clientData = await helpers.queryDB('clients')
        const client = clientData[clientId] || null

        if (client !== null) {
            res.status(200).send(client)
        } else {
            res.status(404).send({ Error: `Could not find Client ID: ${clientId}` })
        }
    } catch (error) {
        console.error('Error on Get path >>> /client/:id', error)
        res.status(500).send({ Error: 'Could not read database' })
    }
})

app.get('/get-all-products', async (req, res) => {
    try {
        const allProducts = await helpers.queryDB('products')
        res.status(200).send(allProducts)
    } catch (error) {
        console.error('Error on Get path >>> /get-all-products', error)
        res.status(500).send({ Error: 'Could not read database' })
    }
})

app.get('/get-single-product/:code', async (req, res) => {
    const prodCode = req.params.code

    try {
        const products = await helpers.queryDB('products_by_code')
        const product = products[prodCode] || null

        if (product !== null) {
            res.status(200).send([product])
        } else {
            res.status(404).send({ Error: `Could not find Product code: ${prodCode}` })
        }
    } catch (error) {
        console.error('Error on Get path >>> /get-single-product/:code', error)
        res.status(500).send({ Error: 'Could not read database' })
    }
})

app.get('/product-match-terms/:terms', async (req, res) => {
    const terms = req.params.terms

    try {
        const products = await helpers.queryDB('products')
        const results = products.filter(({ name }) => name.includes(terms.toUpperCase()))

        if (results.length) {
            res.status(200).send(results)
        } else {
            res.status(404).send({ Error: `Could not match products with terms ${terms}` })
        }
    } catch (error) {
        console.error('Error on Get path >>> /product-match-terms/:terms', error)
        res.status(500).send({ Error: 'Could not read database' })
    }
})

app.get('/product-match-code/:code', async (req, res) => {
    const prodCode = req.params.code
    const regx = new RegExp(`^${prodCode}.*`)
    
    try {
        const products = await helpers.queryDB('products')
        const results = products.filter(({ code }) => regx.test(code.toUpperCase()))

        if (results.length) {
            res.status(200).send(results)
        } else {
            res.status(404).send({ Error: `Could not match products with code ${prodCode}` })
        }
    } catch (error) {
        console.error('Error on Get path >>> /product-match-code/:code', error)
        res.status(500).send({ Error: 'Could not read database' })
    }
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
