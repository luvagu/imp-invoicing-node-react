const { queryDB, updateStats, listDocs } = require('./helpers')

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

// Consolidate stats and update stats db file
workers.statsUpdate = async () => {
    try {
        const docStats = await workers.docStats()
        const dbStats = await workers.dbStats()
        const newStats = { ...docStats, ...dbStats }
        if (await updateStats(newStats)) {
            return console.log('new stats >>>', newStats)
        }
    } catch (error) {
        return console.error('stats update error >>>', error)
    }
}

// Run statsUpdate every hour
workers.loop = () => {
    setInterval(() => {
        workers.statsUpdate()
    }, 1000 * 60 * 60)
}

// Init script
workers.init = () => {
    workers.loop()
}

module.exports = workers.init
