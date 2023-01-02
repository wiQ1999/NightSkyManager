const sql = require('mssql/msnodesqlv8')
const config = {
    server: 'localhost',
    database: 'NightSkyDatabase',
    options: {
        trustedConnection: true
    }
}

class MSSQLDatabase {
    async connect() {
        try {
            this.pool = await sql.connect(config)
        } catch (err) {
            console.error("Error while connection:\n" + err)
        }
    }

    async query(query) {
        try {
            const result = await this.pool.request().query(query)
            return result.recordset
        } catch (err) {
            console.error("Error while query:\n" + err)
        }
    }

    async close() {
        try {
            await sql.close()
        } catch (err) {
            console.error("Error while closing connection:\n" + err)
        }
    }
}

module.exports = MSSQLDatabase