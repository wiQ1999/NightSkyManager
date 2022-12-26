const baseQueries = require('./mainBodyQueries');

const table = 'constellations';

function selectAllConstellations() {
    return baseQueries.selectAll(table);
}

function selectConstellationById(id) {
    return baseQueries.selectById(table, id);
}

function insertConstellation(dto) {
    return baseQueries.insert(table, dto);
}

function updateConstellationById(id, dto) {
    return baseQueries.updateById(table, id, dto);
}

function deleteConstellationById(id) {
    return baseQueries.deleteById(table, id);
}

module.exports = {
    table,
    selectAllConstellations,
    selectConstellationById,
    insertConstellation,
    updateConstellationById,
    deleteConstellationById,
};