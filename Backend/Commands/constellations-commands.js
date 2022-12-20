const MSSQLDatabase = require('./MSSQLDatabase');
const NotFoundInDbError = require('../errors/NotFoundInDbError')

const db = new MSSQLDatabase();

async function selectAllConstellations() {
    await db.connect();

    const result = await db.query(
        'SELECT * FROM [Constellations];');

    db.close();
    return result;
}

async function selectConstellationById(id) {
    await db.connect();

    const result = await db.query(
        `SELECT * FROM [Constellations] WHERE [Id]=${id};`);

    if (!result || result.length == 0)
        throw new NotFoundInDbError('Constellations', id);

    db.close();
    return result;
}

async function insertConstellation(dto) {
    await db.connect();

    await db.query(
        `INSERT INTO [Constellations] ([Name], [Description], [Link]) 
        VALUES ('${dto.name}', '${dto.description}', '${dto.link}');`);

    db.close();
}

async function updateConstellation(id, dto) {
    await db.connect();

    const result = await db.query(
        `SELECT * FROM [Constellations] WHERE [Id]=${id};`);

    if (!result || result.length == 0)
        throw new NotFoundInDbError('Constellations', id);

    await db.query(
        `UPDATE [Constellations] 
        SET [Name]='${dto.name}', [Description]='${dto.description}', [Link]='${dto.link}' 
        WHERE [Id]=${id};`);

    db.close();
}

async function deleteConstellation(id) {
    await db.connect();

    const result = await db.query(
        `SELECT * FROM [Constellations] WHERE [Id]=${id};`);

    if (!result || result.length == 0)
        throw new NotFoundInDbError('Constellations', id);

    await db.query(`DELETE FROM [Constellations] WHERE [Id]=${id};`);

    db.close();
}

module.exports = {
    selectAllConstellations,
    selectConstellationById,
    insertConstellation,
    updateConstellation,
    deleteConstellation
};