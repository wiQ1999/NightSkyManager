const MSSQLDatabase = require('../database/MSSQLDatabase');
const NotFoundInDbError = require('../errors/NotFoundInDbError')
const starsQueries = require('../database/queries/starsQueries');

const db = new MSSQLDatabase();

async function selectAllStars() {
    await db.connect();
    const result = await db.query(starsQueries.selectAllStars());
    db.close();
    return result;
}

async function selectStarById(id) {
    await db.connect();
    const result = await db.query(starsQueries.selectStarById(id));
    if (!result || result.length == 0)
        throw new NotFoundInDbError('stars', id);
    db.close();
    return result;
}

async function selectConstellationsByStarId(id) {
    await db.connect();
    const star = await db.query(starsQueries.selectStarById(id));
    if (!star || star.length == 0)
        throw new NotFoundInDbError('stars', id);
    const result = await db.query(starsQueries.selectConstellationsByStarId(id));
    db.close();
    return result;
}

async function insertStar(dto) {
    await db.connect();
    await db.query(starsQueries.insertStar(dto));
    db.close();
}

async function updateStarById(id, dto) {
    await db.connect();
    const result = await db.query(starsQueries.selectStarById(id));
    if (!result || result.length == 0)
        throw new NotFoundInDbError('stars', id);
    await db.query(starsQueries.updateStarById(id, dto));
    db.close();
}

async function deleteStarById(id) {
    await db.connect();
    const result = await db.query(starsQueries.selectStarById(id));
    if (!result || result.length == 0)
        throw new NotFoundInDbError('stars', id);
    await db.query(starsQueries.deleteStarById(id));
    db.close();
}

module.exports = {
    selectAllStars,
    selectStarById,
    selectConstellationsByStarId,
    insertStar,
    updateStarById,
    deleteStarById
};