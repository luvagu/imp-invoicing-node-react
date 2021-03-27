const path = require('path')
const fs = require('fs/promises')

const baseDir = path.join(__dirname, '/../data/')

const parseJsonToObject = (str) => {
    try {
        return JSON.parse(str)
    } catch (error) {
        return {}
    }
}

const helpers = {}

helpers.queryDB = async (dbName) => {
    const data = await fs.readFile(baseDir+'db/'+dbName+'.json', 'utf8')
    return parseJsonToObject(data)
}

helpers.getNextDocNum = async (prop) => {
    const sequences = await helpers.queryDB('sequences')
    const nextNumber = sequences[prop] + 1
    await helpers.updateSequences(prop, nextNumber)
    return nextNumber.toString()
}

helpers.updateSequences = async (propToUpdate, newValue) => {
    const sequences = await helpers.queryDB('sequences')
    const newSequences = (propToUpdate in sequences) && typeof(newValue) === 'number' && !isNaN(newValue) ? { ...sequences, [propToUpdate]: newValue } : false
    if (!newSequences) {
        throw new Error(`No se pudo actualizar secuencias, nombre de propiedad no definida: ${propToUpdate} o tipo de valor invalido: ${newValue}`)
    }
    if (newValue < sequences[propToUpdate]) {
        throw new Error(`No se pudo actualizar secuencias, nuevo valor: ${newValue} debe ser mayor que el anterior: ${sequences[propToUpdate]}`)
    }
    const fileDescriptor = await fs.open(baseDir+'db/sequences.json', 'r+')
    await fileDescriptor.truncate()
    await fileDescriptor.writeFile(JSON.stringify(newSequences))
    await fileDescriptor.close()
    return { message: `Secuencia ${propToUpdate} actualizada!`}
}

helpers.readDoc = async (dir, fileName) => {
    const data = await fs.readFile(baseDir+dir+'/'+fileName+'.json', 'utf8')
    return parseJsonToObject(data)
}

helpers.creteDoc = async (dir, fileData) => {
    const fileName = await helpers.getNextDocNum(dir)
    const fileDescriptor = await fs.open(baseDir+dir+'/'+fileName+'.json', 'wx')
    // The client at first doesn't have the docNum/fileName so we update the docNum before write
    fileData.docNum = fileName
    await fileDescriptor.writeFile(JSON.stringify(fileData))
    await fileDescriptor.close()
    return { message: `Documento No. ${fileName} creado!`, docNum: fileName }
}

helpers.updateDoc = async (dir, fileName, fileData) => {
    const fileDescriptor = await fs.open(baseDir+dir+'/'+fileName+'.json', 'r+')
    await fileDescriptor.truncate()
    await fileDescriptor.writeFile(JSON.stringify(fileData))
    await fileDescriptor.close()
    return { message: `Documento No. ${fileName} actualizado!` }
}

helpers.listDocsExtended = async (dir, fileName) => {
    // Return a single file when fileName is receiveed
    if (fileName !== undefined && fileName.trim().length > 0) {
        const { docNum, docDate, docTotal, clientData: { name } } = parseJsonToObject(await fs.readFile(baseDir+dir+'/'+fileName+'.json', 'utf8'))
        return [{ docNum, docDate, docTotal, name }]
    }

    // Otherwise read dir and loop through each file
    const fileNames = await fs.readdir(baseDir+dir+'/')

    if (fileNames.length) {
        const docsSummary = []

        for (const fileName of fileNames) {
            const { docNum, docDate, docTotal, clientData: { name } } = parseJsonToObject(await fs.readFile(baseDir+dir+'/'+fileName, 'utf8'))
            docsSummary.push({ docNum, docDate, docTotal, name })
        }
        const sortedDocs = docsSummary.sort((a, b) => b.docNum - a.docNum)

        return sortedDocs
    }

    return []
}

helpers.deleteDoc = async (dir, fileName) => {
    await fs.unlink(baseDir+dir+'/'+fileName+'.json')
    return { message: `Documento No. ${fileName} borrado!` }
}

helpers.deleteAllDocs = async (dir) => {
    // await fs.rmdir(baseDir+'invoices/', { recursive: true, force: true }) // deletes directory as well

    const files = await fs.readdir(baseDir+dir+'/', 'utf8')

    if (!files.length) return { message: 'Nada para borrar, la carpeta esta vacia' }

    let deletedFiles = 0
    for (const file of files) {
        await fs.unlink(baseDir+dir+'/'+file)
        deletedFiles++
    }
    
    return { message: `Exito: ${deletedFiles} documentos borrados` }
}

module.exports = helpers
