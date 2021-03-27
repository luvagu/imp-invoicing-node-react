const path = require('path')
const fs = require('fs/promises')
const { queryDB, updateSequences } = require('./helpers')

const baseDir = path.join(__dirname, '/../data/')

const worker = {}

worker.countDocs = async () => {
    const folderNames = ['egresos', 'facturas', 'proformas']

    for (const folder of folderNames) {
        
    }
}

worker.countDbItems = async () => {
    const dbNames = ['products', 'clients']

    for (const name of dbNames) {
        
    }
}