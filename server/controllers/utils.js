const { queryDB, updateSequencesProp } = require("../lib/helpers")

const getDocSalesStats = async (req, res) => {
    try {
        const stats = await queryDB('stats')
        res.status(200).send(stats)
    } catch (error) {
        console.error('Error on Get path >>> /doc-stats', error.message)
        res.status(500).send({ error: 'No se pudo leer la base de datos' })
    }
}

const getDocSequences = async (req, res) => {
    try {
        const sequences = await queryDB('sequences')
        res.status(200).send(sequences)
    } catch (error) {
        console.error('Error on Get path >>> /doc-sequences', error.message)
        res.status(500).send({ error: 'No se pudo leer la base de datos' })
    }
}

const putUpdateSequence = async (req, res) => {
    const { prop, value } = req.params
    try {
        const response = await updateSequencesProp(prop, parseInt(value))
        res.status(200).send(response)
    } catch (error) {
        console.error('Error on Put path >>> /doc-sequences/:name', error.message)
        res.status(500).send({ error: error.message })
    }
}

module.exports = {
    getDocSalesStats,
    getDocSequences,
    putUpdateSequence
}
