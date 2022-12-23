const baseQueries = require('./baseQueries');

const table = 'stars';

function selectAllStars() {
    return baseQueries.selectAll(table);
}

function selectStarById(id) {
    return baseQueries.selectById(table, id);
}

function selectConstellationsByStarId(id) {
    return `SELECT [constellations].* FROM [constellations] 
        INNER JOIN [constellations_stars] AS [sc] ON [sc].[constellationId]=[constellations].[id] 
        WHERE [sc].[starsId]=${id};`
}

function insertStar(dto) {
    return baseQueries.insert(table, dto);
}

function updateStarById(id, dto) {
    return baseQueries.updateById(table, id, dto);
}

function deleteStarById(id) {
    return baseQueries.deleteById(table, id);
}

module.exports = {
    selectAllStars,
    selectStarById,
    selectConstellationsByStarId,
    insertStar,
    updateStarById,
    deleteStarById
};