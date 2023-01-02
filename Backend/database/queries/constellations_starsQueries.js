const table = 'constellations_stars'

function selectConstellationIdsByStarId(id) {
    return `SELECT [constellationId] AS [id] FROM [constellations_stars] WHERE [starId]=${id};`
}

function selectConstellationsByStarId(id) {
    return `SELECT [constellations].* FROM [constellations] 
        INNER JOIN [${table}] AS [sc] ON [sc].[constellationId]=[constellations].[id] 
        WHERE [sc].[starId]=${id};`
}

function selectStarIdsByConstellationId(id) {
    return `SELECT [starId] AS [id] FROM [constellations_stars] WHERE [constellationId]=${id};`
}

function selectStarsByConstellationId(id) {
    return `SELECT [stars].* FROM [stars] 
        INNER JOIN [${table}] AS [sc] ON [sc].[starId]=[stars].[id] 
        WHERE [sc].[constellationId]=${id};`
}

function insertRelation(constellationId, starId) {
    return `INSERT INTO [dbo].[constellations_stars] ([constellationId] ,[starId])
        VALUES (${constellationId}, ${starId});`
}

function deleteRelation(constellationId, starId) {
    return `DELETE FROM [${table}] 
        WHERE [constellationId]=${constellationId} AND [starId]=${starId};`
}

module.exports = {
    table,
    selectConstellationIdsByStarId,
    selectConstellationsByStarId,
    selectStarIdsByConstellationId,
    selectStarsByConstellationId,
    insertRelation,
    deleteRelation
}
