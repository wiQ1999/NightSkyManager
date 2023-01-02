const MSSQLDatabase = require('../database/MSSQLDatabase')
const NotFoundInDbError = require('../errors/NotFoundInDbError')
const baseQueries = require('../database/queries/baseQueires')
const constellationQueries = require('../database/queries/constellationsQueries')
const relationsQueries = require('../database/queries/constellations_starsQueries')

const db = new MSSQLDatabase()

async function createConstellation(dto) {
    await db.connect()
    try {
        await db.query(constellationQueries.insertConstellation(dto))

        const response = await db.query(baseQueries.selectLastId(constellationQueries.table))
        if (!response || response.length == 0)
            throw new QuerieError(constellationQueries.table)
        const constellationId = response[0].id

        for (let i = 0; i < dto.related.length; i++) {
            const starId = dto.related[i]
            await db.query(relationsQueries.insertRelation(constellationId, starId))
        }
    } finally {
        db.close()
    }
}

async function readAllConstellations() {
    let result
    await db.connect()
    try {
        result = await db.query(constellationQueries.selectAllConstellations())
    } finally {
        db.close()
    }
    return result
}

async function readConstellationById(id) {
    let result
    await db.connect()
    try {
        const response = await db.query(constellationQueries.selectConstellationById(id))
        if (!response || response.length == 0)
            throw new NotFoundInDbError(constellationQueries.table, id)
        result = response[0]

        result.related = await db.query(relationsQueries.selectStarsByConstellationId(result.id))
    } finally {
        db.close()
    }
    return result
}

async function updateConstellationById(id, dto) {
    await db.connect()
    try {
        const response = await db.query(constellationQueries.selectConstellationById(id))
        if (!response || response.length == 0)
            throw new NotFoundInDbError(constellationQueries.table, id)

        await db.query(constellationQueries.updateConstellationById(id, dto))

        const currentStarIds = await db.query(relationsQueries.selectStarIdsByConstellationId(id))

        for (let i = 0; i < dto.related.length; i++) {
            const newStarId = dto.related[i]

            if (!currentStarIds.some(row => row.id === newStarId))
                await db.query(relationsQueries.insertRelation(id, newStarId))
        }

        for (let i = 0; i < currentStarIds.length; i++) {
            const currentStarId = currentStarIds[i].id

            if (!dto.related.includes(currentStarId))
                await db.query(relationsQueries.deleteRelation(id, currentStarId))
        }
    } finally {
        db.close()
    }
}

async function deleteConstellationById(id) {
    await db.connect()
    try {
        const result = await db.query(constellationQueries.selectConstellationById(id))
        if (!result || result.length == 0)
            throw new NotFoundInDbError(constellationQueries.table, id)
        await db.query(constellationQueries.deleteConstellationById(id))
    } finally {
        db.close()
    }
}

module.exports = {
    createConstellation,
    readAllConstellations,
    readConstellationById,
    updateConstellationById,
    deleteConstellationById
}