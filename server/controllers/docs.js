const { listDocsExtended, readDoc, createDoc, updateDoc, deleteDoc, deleteAllDocs } = require("../lib/helpers")

const getDocSingle = async (req, res) => {
    const { folder:dir, doc:fileName } = req.params

    try {
        const invoiceData = await readDoc(dir, fileName)
        res.status(200).send(invoiceData)
    } catch (error) {
        console.error('Error on Get path >>> /get-doc/:folder/:doc', error.message)
        res.status(404).send({ error: `No se pudo obtener el documento ${fileName}` })
    }
}

const getDocList = async (req, res) => {
    const { folder:dir, doc:fileName } = req.params

    try {
        const docsList = await listDocsExtended(dir, fileName)
        if (docsList.length) {
            res.status(200).send(docsList)
        } else {
            res.status(404).send({ error: 'No hay documentos para mostrar' })
        }
    } catch (error) {
        console.error('Error on Get path >>> /list-docs/:folder/:doc?', error.message)
        res.status(404).send({ error: 'No se pudo obtener el documento o lista de documentos' })
    }
}

const postCreateDoc = async (req, res) => {
    const { folder:dir } = req.params
    const fileData = req.body

    try {
        const response = await createDoc(dir, fileData)
        res.status(200).send(response)
    } catch (error) {
        console.error('Error on Post path >>> /create-doc/:folder', error.message)
        res.status(500).send({ error: 'No se pudo crear el documento, es posible que ya exista' })
    }
}

const putUpdateDoc = async (req, res) => {
    const { folder:dir, doc:fileName } = req.params
    const fileData = req.body

    try {
        const response = await updateDoc(dir, fileName, fileData)
        res.status(200).send(response)
    } catch (error) {
        console.error('Error on Put path >>> /update-doc/:folder/:doc', error.message)
        res.status(500).send({ error: `No se pudo actualizar el documento ${fileName}` })
    }
}

const deleteDocSingle = async (req, res) => {
    const { folder:dir, doc:fileName } = req.params
    try {
        const response = await deleteDoc(dir, fileName)
        res.status(200).send(response)
    } catch (error) {
        console.error('Error on Delete path >>> /delete-doc/:folder/:doc', error.message)
        res.status(500).send({ error: `No se pudo borrar el documento ${fileName}` })
    }
}

const deleteDocAll = async (req, res) => {
    const dir = req.params.folder

    try {
        const response = await deleteAllDocs(dir)
        res.status(200).send(response)
    } catch (error) {
        console.error('Error on Post path >>> /delete-all-docs/:folder', error.message)
        res.status(500).send({ error: 'No se pudieron borrar los documentos' })
    }
}

module.exports = {
    getDocSingle,
    getDocList,
    postCreateDoc,
    putUpdateDoc,
    deleteDocSingle,
    deleteDocAll
}
