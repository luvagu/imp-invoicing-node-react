const { queryDB } = require("../lib/helpers")

const getSingleClientId = async (req, res) => {
    const clientId = req.params.query

    try {
        const clientData = await queryDB('clients_by_id')
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
}

const getClientsByName = async (req, res) => {
    const clientName = req.params.query

    try {
        const clientData = await queryDB('clients')
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
}

const getSingleProductId = async (req, res) => {
    const prodId = req.params.query

    try {
        const products = await queryDB('products_by_id')
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
}

const getProductsWithTerms = async (req, res) => {
    const query = req.params.query
    const idRegx = new RegExp(`^${query.toLowerCase()}.*`)

    try {
        const products = await queryDB('products')
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
}

module.exports = {
    getSingleClientId,
    getClientsByName,
    getSingleProductId,
    getProductsWithTerms
}
