const MSSQLDatabase = require('../database/MSSQLDatabase')
const NotFoundInDbError = require('../errors/NotFoundInDbError')
const QuerieError = require('../errors/QuerieError')
const baseQueries = require('../database/queries/baseQueires')
const starsQueries = require('../database/queries/starsQueries')
const relationsQueries = require('../database/queries/constellations_starsQueries')

const db = new MSSQLDatabase()

async function createStar(dto) {
    await db.connect()
    try {
        await db.query(starsQueries.insertStar(dto))

        const response = await db.query(baseQueries.selectLastId(starsQueries.table))
        if (!response || response.length == 0)
            throw new QuerieError(starsQueries.table)
        const starId = response[0].id

        for (let i = 0; i < dto.related.length; i++) {
            const constellationId = dto.related[i]
            await db.query(relationsQueries.insertRelation(constellationId, starId))
        }
    } finally {
        db.close()
    }
}

async function readAllStars() {
    let result;
    await db.connect()
    try {
        result = await db.query(starsQueries.selectAllStars())
    } finally {
        db.close()
    }
    return result
}

async function readStarById(id) {
    let result
    await db.connect()
    try {
        const response = await db.query(starsQueries.selectStarById(id))
        if (!response || response.length == 0)
            throw new NotFoundInDbError(starsQueries.table, id)
        result = response[0]

        result.related = await db.query(relationsQueries.selectConstellationsByStarId(result.id))
    } finally {
        db.close()
    }
    return result
}

async function updateStarById(id, dto) {
    await db.connect()
    try {
        const response = await db.query(starsQueries.selectStarById(id))
        if (!response || response.length == 0)
            throw new NotFoundInDbError(starsQueries.table, id)

        await db.query(starsQueries.updateStarById(id, dto))

        const currentConstellationIds = await db.query(relationsQueries.selectConstellationIdsByStarId(id))

        for (let i = 0; i < dto.related.length; i++) {
            const newConstellationId = dto.related[i]

            if (!currentConstellationIds.some(row => row.id === newConstellationId))
                await db.query(relationsQueries.insertRelation(newConstellationId, id))
        }

        for (let i = 0; i < currentConstellationIds.length; i++) {
            const currentConstellationId = currentConstellationIds[i].id

            if (!dto.related.includes(currentConstellationId))
                await db.query(relationsQueries.deleteRelation(currentConstellationId, id))
        }
    } finally {
        db.close()
    }
}

async function deleteStarById(id) {
    await db.connect()
    try {
        const result = await db.query(starsQueries.selectStarById(id))
        if (!result || result.length == 0)
            throw new NotFoundInDbError(starsQueries.table, id)
        await db.query(starsQueries.deleteStarById(id))
    } finally {
        db.close()
    }
}

module.exports = {
    createStar,
    readAllStars,
    readStarById,
    updateStarById,
    deleteStarById
}