class NotFoundInDbError extends Error {
    constructor(table, id) {
        const message = `Record with id "${id}" not found in table "${table}".`
        super(message)
        this.field = message
    }
}

module.exports = NotFoundInDbError