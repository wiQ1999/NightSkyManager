class QuerieError extends Error {
    constructor(table) {
        const message = `Executing query in table "${table}" failed.`
        super(message)
        this.field = message
    }
}

module.exports = QuerieError