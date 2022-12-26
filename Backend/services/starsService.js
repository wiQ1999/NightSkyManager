const MSSQLDatabase = require('../database/MSSQLDatabase');
const NotFoundInDbError = require('../errors/NotFoundInDbError')
const QuerieError = require('../errors/QuerieError')
const baseQueries = require('../database/queries/baseQueires');
const starsQueries = require('../database/queries/starsQueries');
const relationsQueries = require('../database/queries/constellations_starsQueries');

const db = new MSSQLDatabase();

async function createStar(dto) {
    await db.connect();
    try {
        await db.query(starsQueries.insertStar(dto));
        const response = await db.query(baseQueries.selectLastId(starsQueries.table));
        if (!response || response.length == 0)
            throw new QuerieError(starsQueries.table);
        for (let i = 0; i < dto.related.length; i++) {
            const constellationId = dto.related[i];
            await db.query(relationsQueries.insertRelation(constellationId, response[0].id));
        }
    } finally {
        db.close();
    }
}

async function readAllStars() {
    await db.connect();
    const result = await db.query(starsQueries.selectAllStars());
    db.close();
    return result;
}

async function readStarById(id) {
    await db.connect();
    const response = await db.query(starsQueries.selectStarById(id));
    if (!response || response.length == 0)
        throw new NotFoundInDbError(starsQueries.table, id);
    let result = response[0];
    result.related = await db.query(relationsQueries.selectConstellationsByStarId(result.id));
    db.close();
    return result;
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
    createStar,
    readAllStars,
    readStarById,
    updateStarById,
    deleteStarById
};