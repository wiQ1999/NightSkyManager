const MSSQLDatabase = require('../database/MSSQLDatabase');
const NotFoundInDbError = require('../errors/NotFoundInDbError')
const constellationQueries = require('../database/queries/constellationsQueries');

const db = new MSSQLDatabase();

async function selectAllConstellations() {
    await db.connect();
    const result = await db.query(constellationQueries.selectAllConstellations());
    db.close();
    return result;
}

async function selectConstellationById(id) {
    await db.connect();
    const result = await db.query(constellationQueries.selectConstellationById(id));
    if (!result || result.length == 0)
        throw new NotFoundInDbError('Constellations', id);
    db.close();
    return result;
}

async function selectStarsByConstellationId(id) {
    await db.connect();
    const constellation = await db.query(constellationQueries.selectConstellationById(id));
    if (!constellation || constellation.length == 0)
        throw new NotFoundInDbError('Constellations', id);
    const result = await db.query(constellationQueries.selectStarsByConstellationId(id));
    db.close();
    return result;
}

async function insertConstellation(dto) {
    await db.connect();
    await db.query(constellationQueries.insertConstellation(dto));
    db.close();
}

async function updateConstellationById(id, dto) {
    await db.connect();
    const result = await db.query(constellationQueries.selectConstellationById(id));
    if (!result || result.length == 0)
        throw new NotFoundInDbError('Constellations', id);
    await db.query(constellationQueries.updateConstellationById(id, dto));
    db.close();
}

async function deleteConstellationById(id) {
    await db.connect();
    const result = await db.query(constellationQueries.selectConstellationById(id));
    if (!result || result.length == 0)
        throw new NotFoundInDbError('Constellations', id);
    await db.query(constellationQueries.deleteConstellationById(id));
    db.close();
}

module.exports = {
    selectAllConstellations,
    selectConstellationById,
    selectStarsByConstellationId,
    insertConstellation,
    updateConstellationById,
    deleteConstellationById
};