const baseQueries = require('./mainBodyQueries')

const table = 'stars'

function selectAllStars() {
    return baseQueries.selectAll(table)
}

function selectStarById(id) {
    return baseQueries.selectById(table, id)
}

function insertStar(dto) {
    return baseQueries.insert(table, dto)
}

function updateStarById(id, dto) {
    return baseQueries.updateById(table, id, dto)
}

function deleteStarById(id) {
    return baseQueries.deleteById(table, id)
}

module.exports = {
    table,
    selectAllStars,
    selectStarById,
    insertStar,
    updateStarById,
    deleteStarById,
}