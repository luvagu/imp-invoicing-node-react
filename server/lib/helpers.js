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

const updateSequences = async (sequences) => {
    const fd = await fs.open(baseDir+'db/sequences.json', 'r+')
    await fd.truncate()
    await fd.writeFile(JSON.stringify(sequences))
    await fd.close()
}

const getNextDocNum = async (type) => {
    const sequences = parseJsonToObject(await fs.readFile(baseDir+'db/sequences.json', 'utf8'))
    sequences[type] = sequences[type] + 1
    await updateSequences(sequences)
    return sequences[type].toString()
}

const helpers = {}

helpers.queryDB = async (dbName) => {
    const data = await fs.readFile(baseDir+'db/'+dbName+'.json', 'utf8')
    return parseJsonToObject(data)
}

helpers.readDoc = async (dir, fileName) => {
    const data = await fs.readFile(baseDir+dir+'/'+fileName+'.json', 'utf8')
    return parseJsonToObject(data)
}

helpers.creteDoc = async (dir, fileData) => {
    const fileName = await getNextDocNum(dir)
    const fileDescriptor = await fs.open(baseDir+dir+'/'+fileName+'.json', 'wx')
    await fileDescriptor.writeFile(JSON.stringify(fileData))
    await fileDescriptor.close()
    return { message: `Success: Document ${dir}/${fileName} created`, docNum: fileName }
}

helpers.listDocs = async (dir) => {
    const data = await fs.readdir(baseDir+dir+'/')
    const trimmedFileNames = []
    data.forEach(fileName => {
        trimmedFileNames.push(fileName.replace('.json', ''))
    })
    return trimmedFileNames
}

helpers.deleteDoc = async (dir, fileName) => {
    await fs.unlink(baseDir+dir+'/'+fileName+'.json')
    return { message: `Success: Document ${dir}/${fileName} deleted` }
}

helpers.deleteAllDocs = async (dir) => {
    // await fs.rmdir(baseDir+'invoices/', { recursive: true, force: true }) // deletes directory as well

    const files = await fs.readdir(baseDir+dir+'/', 'utf8')

    if (!files.length) return { message: 'Nothing to delete, directory already empty' }

    let deletedFiles = 0
    for await (const file of files) {
        fs.unlink(baseDir+dir+'/'+file)
        deletedFiles++
    }
    
    return { message: `Success: ${deletedFiles} documents deleted from ${dir}` }
}

module.exports = helpers
