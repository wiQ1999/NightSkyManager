const table = 'constellations_stars';

function seletConstellationsByStarId(id) {
    return `SELECT [constellations].* FROM [constellations] 
        INNER JOIN [${table}] AS [sc] ON [sc].[constellationId]=[constellations].[id] 
        WHERE [sc].[starId]=${id};`
}

function selectStarsByConstellationId(id) {
    return `SELECT [stars].* FROM [stars] 
        INNER JOIN [${table}] AS [sc] ON [sc].[starId]=[stars].[id] 
        WHERE [sc].[constellationId]=${id};`
}

function insertRelation(constellationId, starId) {
    return `INSERT INTO [dbo].[constellations_stars] ([constellationId] ,[starId])
        VALUES (${constellationId}, ${starId})`;
}

function deleteRelation(constellationId, starId) {
    return `DELETE FROM [${table}] 
        WHERE [constellationId]=${constellationId} AND [starId]=${starId};`;
}

module.exports = {
    seletConstellationsByStarId,
    selectStarsByConstellationId,
    insertRelation,
    deleteRelation
};
