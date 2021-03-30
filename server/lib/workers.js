const helpers = require('./helpers')
const { queryDB, updateStats, listDocs, readDoc } = require('./helpers')

// Instantiate workers
const workers = {}

// Count docs in each directory
workers.docStats = async () => {
    const dirNames = ['egresos', 'facturas', 'proformas']
    const docStats = {}

    for (const dir of dirNames) {
        const totalDirDocs = await listDocs(dir)
        docStats[dir] = totalDirDocs.length
    }

    return docStats
}

// Count items in each database
workers.dbStats = async () => {
    const dbNames = ['products', 'clients']
    const dbStats = {}

    for (const name of dbNames) {
        const totalDbItems = await queryDB(name)
        dbStats[name] = totalDbItems.length
    }

    return dbStats
}

// Get sales total
workers.salesStats = async () => {
    const dirNames = ['egresos', 'facturas']
    const allTotals = []

    for (const dir of dirNames) {
        const dirDocs = await listDocs(dir)
        
        for (const doc of dirDocs) {
            const { docTotal } = await readDoc(dir, doc)
            allTotals.push(docTotal)
        }
    }

    const ventas = allTotals.reduce((acc, cv) => acc + parseFloat(cv), 0).toFixed(2)
    return { ventas }
}

// Consolidate stats and update stats db file
workers.statsUpdate = async () => {
    try {
        const docStats = await workers.docStats()
        const dbStats = await workers.dbStats()
        const salesTotal = await workers.salesStats()
        const newStats = { ...docStats, ...dbStats, ...salesTotal }
        if (await updateStats(newStats)) {
            return console.log('new stats >>>', newStats)
        }
    } catch (error) {
        return console.error('stats update error >>>', error.message)
    }
}

// Delete expired tokens
workers.deleteExpiredTokens = async () => {
    try {
        const tokensList = await helpers.listDocs('tokens')
        let deleteCount = 0

        for (const fileName of tokensList) {
            const tokenData = await helpers.readDoc('tokens', fileName)
            const isValid = await helpers.verifyToken(tokenData.id, tokenData.user)
            if (!isValid) {
                deleteCount++
                await helpers.deleteDoc('tokens', fileName)
            }
        }

        return console.log(`${deleteCount} expired tokens deleted`)
    } catch (error) {
        console.error('delete expired tokens error >>>', error.message)
    }
}

// Run statsUpdate every half hour
workers.loop = () => {
    setInterval(() => {
        workers.statsUpdate()
    }, 1000 * 60 * 30)
}

// Init script
workers.init = () => {
    workers.loop()
    workers.deleteExpiredTokens()
}

module.exports = workers.init
