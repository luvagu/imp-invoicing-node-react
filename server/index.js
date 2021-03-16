const path = require('path')

const helpers = require('./lib/helpers')

const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const compression = require('compression')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// export NODE_ENV=production
if (process.env.NODE_ENV === 'production') {
    app.use(compression())
    app.use(express.static(path.join(__dirname, '..', 'client/build')))
}

app.get('/', (req, res) => {
    res.send({ welcome: 'Welcome to IMP Invoicing' })
})

app.get('/client/:id', async (req, res) => {
    const clientId = req.params.id

    try {
        const clientData = await helpers.readFile('clients', 'clients')
        const client = clientData[clientId] || {}
        res.status(200).send(client)
    } catch (error) {
        console.error('Error on Get path >>> /invoice/:num', error)
        res.status(500).send({ Error: 'Could not retrieve the requested invoice' })
    }
})

app.get('/invoices', async (req, res) => {
    try {
        const list = await helpers.listInvoices()
        res.status(200).send({ invoicesList: list })
    } catch (error) {
        console.error('Error on Get path >>> /invoices', error)
        res.status(500).send({ Error: 'Could not retrieve the invoices list' })
    }
})

app.get('/invoice/:num', async (req, res) => {
    const fileName = req.params.num

    try {
        const invoiceData = await helpers.readFile('invoices', fileName)
        res.status(200).send(invoiceData)
    } catch (error) {
        console.error('Error on Get path >>> /invoice/:num', error)
        res.status(500).send({ Error: 'Could not retrieve the requested invoice' })
    }
})

app.post('/invoice/create', async (req, res) => {
    const fileName = req.body.invoice_num
    const data = req.body

    try {
        await helpers.creteInvoice(fileName, data)
        const invoiceData = await helpers.readFile('invoices', fileName)
        res.status(200).send({ invoiceData })
    } catch (error) {
        console.error('Error on Post path >>> /invoice/create', error)
        res.status(500).send({ Error: 'Could not creteate invoice, may already exists' })
    }
})

app.get('/products', async (req, res) => {
    try {
        const list = await helpers.readFile('products', 'products')
        res.status(200).send(list)
    } catch (error) {
        console.error('Error on Get path >>> /invoices', error)
        res.status(500).send({ Error: 'Could not retrieve the invoices list' })
    }
})

app.get('/product-by-code/:code', async (req, res) => {
    const prodCode = req.params.code

    try {
        const products = await helpers.readFile('products', 'products_by_code')
        const product = products[prodCode] || {}

        res.status(200).send(product)
    } catch (error) {
        console.error('Error on Get path >>> /products/:code', error)
        res.status(500).send({ Error: 'Could not find the requested product' })
    }
})

app.get('/product-search-name/:name', async (req, res) => {
    const prodName = req.params.name

    try {
        const products = await helpers.readFile('products', 'products')
        const product = products.filter(({ name }) => name.includes(prodName.toUpperCase()))

        res.status(200).send(product)
    } catch (error) {
        console.error('Error on Get path >>> /products/:code', error)
        res.status(500).send({ Error: 'Could not find the requested product' })
    }
})

app.get('/product-search-code/:code', async (req, res) => {
    const prodCode = req.params.code
    const regx = new RegExp(`^${prodCode}.*`)
    try {
        const products = await helpers.readFile('products', 'products')
        const product = products.filter(({ cod }) => regx.test(cod.toUpperCase()))

        res.status(200).send(product)
    } catch (error) {
        console.error('Error on Get path >>> /products/:code', error)
        res.status(500).send({ Error: 'Could not find the requested product' })
    }
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
