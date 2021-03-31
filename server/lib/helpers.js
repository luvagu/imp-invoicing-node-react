const path = require('path')
const fs = require('fs/promises')
const crypto = require('crypto')

const baseDir = path.join(__dirname + '/../data/')

const parseJsonToObject = (str) => {
    try {
        return JSON.parse(str)
    } catch (error) {
        return {}
    }
}

// Instantiate helpers
const helpers = {}

helpers.queryDB = async (dbName) => {
    const data = await fs.readFile(baseDir+'db/'+dbName+'.json', 'utf8')
    return parseJsonToObject(data)
}

helpers.getNextDocNum = async (prop) => {
    const sequences = await helpers.queryDB('sequences')
    const nextNumber = sequences[prop] + 1
    await helpers.updateSequencesProp(prop, nextNumber)
    return nextNumber.toString()
}

helpers.updateSequencesProp = async (propToUpdate, newValue) => {
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

helpers.updateStats = async (newStats) => {
    const fileDescriptor = await fs.open(baseDir+'db/stats.json', 'r+')
    await fileDescriptor.truncate()
    await fileDescriptor.writeFile(JSON.stringify(newStats))
    await fileDescriptor.close()
    return true
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

helpers.listDocs = async (dir) => {
    const filesNames = await fs.readdir(baseDir+dir+'/')
    const trimmedFileNames = []
    for (const name of filesNames) {
        trimmedFileNames.push(name.replace('.json', ''))
    }
    return trimmedFileNames
}

helpers.listDocsExtended = async (dir, fileName) => {
    // Return a single file when fileName is receiveed
    if (fileName !== undefined && fileName.trim().length > 0) {
        const { docNum, docDate, docTotal, user, clientData: { name: clientName } } = parseJsonToObject(await fs.readFile(baseDir+dir+'/'+fileName+'.json', 'utf8'))
        const shortDate = docDate.split(' ')[0]
        return [{ docNum, shortDate, docTotal, user, clientName }]
    }

    // Otherwise read dir and loop through each file
    const fileNames = await fs.readdir(baseDir+dir+'/')

    if (fileNames.length) {
        const docsSummary = []

        for (const fileName of fileNames) {
            const { docNum, docDate, docTotal, user, clientData: { name: clientName } } = parseJsonToObject(await fs.readFile(baseDir+dir+'/'+fileName, 'utf8'))
            const shortDate = docDate.split(' ')[0]
            docsSummary.push({ docNum, shortDate, docTotal, user, clientName })
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

// Hash passwords
helpers.hash = (password) => {
    if (typeof(password) == 'string' && password.length > 0) {
        const hash = crypto.createHmac('sha256', '1imp792orper673no8s44s00sc1c').update(password).digest('hex')
        return hash
    } else {
        return false
    }
}

// Create token
helpers.createToken = async (id, data) => {
    const fileDescriptor = await fs.open(baseDir+'tokens/'+id+'.json', 'wx')
    await fileDescriptor.writeFile(JSON.stringify(data))
    await fileDescriptor.close()
    return true
}

// Token object
helpers.getUserToken = async (user) => {
    const users = await helpers.queryDB('users')

    if ([user] in users) {
        const id = helpers.createRandomString(20)

        // Set token expiration date 12 hour from now
        const token = {
            id,
            user,
            displayName: users[user].displayName,
            privileges: users[user].privileges,
            expires: Date.now() + 1000 * 60 * 60 * 12
        }

        return token
    } else {
        return false
    }
}

// Verify token
helpers.verifyToken = async (id, user) => {
    const tokenData = await helpers.readDoc('tokens', id)

    // Check that the token is for the given user and has not expired
    if (tokenData.user === user && tokenData.expires > Date.now()) {
        return true
    } else {
        return false
    }
}

// Verify user exists in users DB and hashed passwords match
helpers.verifyUser = async (user, password) => {
    const users = await helpers.queryDB('users')
    const userHashedPassword = helpers.hash(password)

    if ([user] in users && users[user].hashedPassword === userHashedPassword) {
        return true
    } else {
        return false
    }
}

// Create a string of random alphanumeric characters, of a given length
helpers.createRandomString = (length) => {
    length = typeof(length) == 'number' && length > 0 ? length : false

    if (length) {
        const characters = 'aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ0123456789'
        let str = ''

        for (let i = 0; i < length; i++) {
            let randomCharacter = characters.charAt(Math.floor(Math.random() * characters.length))
            str += randomCharacter
        }

        return str
    } else {
        return false
    }
}

module.exports = helpers
