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

module.exports = helpers