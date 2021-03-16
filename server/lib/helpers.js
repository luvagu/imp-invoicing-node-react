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

helpers.readFile = async (dir, fileName) => {
    const data = await fs.readFile(baseDir+dir+'/'+fileName+'.json', 'utf8')
    return parseJsonToObject(data)
}

helpers.creteInvoice = async (fileName, fileData) => {
    const fileDescriptor = await fs.open(baseDir+'invoices/'+fileName+'.json', 'wx')
    await fs.writeFile(fileDescriptor, JSON.stringify(fileData))
    await fileDescriptor.close()
    return true
}

helpers.listInvoices = async () => {
    const data = await fs.readdir(baseDir+'invoices/')
    const trimmedFileNames = []
    data.forEach(fileName => {
        trimmedFileNames.push(fileName.replace('.json', ''))
    })
    return trimmedFileNames
}

helpers.deleteInvoice = async (filename) => {
    await fs.unlink(baseDir+'invoices/'+filename+'.json')
    return { message: `Success: Invoice ${filename} deleted` }
}

helpers.deleteAllInvoices = async () => {
    // await fs.rmdir(baseDir+'invoices/', { recursive: true, force: true }) // deletes directory as well

    const files = await fs.readdir(baseDir+'invoices/', 'utf8')

    if (!files.length) return { message: 'Nothing to delete, directory already empty' }

    let deletedFiles = 0
    for await (const file of files) {
        fs.unlink(baseDir+'invoices/'+file)
        deletedFiles++
    }
    
    return { message: `Success: ${deletedFiles} invoice(s) deleted` }
}

module.exports = helpers