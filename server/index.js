const path = require('path')
const express = require('express')
const cors = require('cors')
const compression = require('compression')
const app = express()

const { getToken, postToken, putToken, deleteToken } = require('./controllers/tokens')
const { getDocList, getDocSingle, postCreateDoc, putUpdateDoc, deleteDocSingle, deleteDocAll } = require('./controllers/docs')
const { getDocSalesStats, getDocSequences, putUpdateSequence } = require('./controllers/utils')
const { getSingleClientId, getClientsByName, getSingleProductId, getProductsWithTerms } = require('./controllers/search')

const startWorkers = require('./lib/workers')

// IMPSRV IP 192.168.1.102
// SELF IP 192.168.1.5
const HOST_HTTP = process.env.NODE_ENV === 'production' ? '192.168.1.102' : 'localhost'
const PORT = process.env.PORT || 5000

// Use middlewares
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
app.get('/search-client-id/:query', getSingleClientId)
app.get('/search-client-name/:query', getClientsByName)
app.get('/search-product-id/:query', getSingleProductId)
app.get('/search-product-includes/:query', getProductsWithTerms)

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

app.listen(PORT, () => {
  console.log(`IMP F&P SIRVIENDOSE EN LA URL >>> http://${HOST_HTTP}:${PORT}`)
})

// Start the workers
startWorkers()
