const MSSQLDatabase = require('./MSSQLDatabase');
const NotFoundInDbError = require('../errors/NotFoundInDbError');

async function selectAllStars() {
    const db = new MSSQLDatabase();
    await db.connect();

    const result = await db.query('SELECT * FROM [Stars];');

    db.close();
    return result;
}

async function selectStarsByConstellationId(id) {
    const db = new MSSQLDatabase();
    await db.connect();

    const result = await db.query(`SELECT * FROM [Stars] WHERE [Id]=${id};`);
    if (!result || result.length == 0) throw new NotFoundInDbError('Stars', id);

    db.close();
    return result;
}

async function selectById(id) {
    const db = new MSSQLDatabase();
    await db.connect();

    const result = await db.query(`SELECT * FROM [Stars] WHERE [Id]=${id};`);
    if (!result || result.length == 0) throw new NotFoundInDbError('Stars', id);

    db.close();
    return result;
}

async function insertStar(dto) {
    const db = new MSSQLDatabase();
    await db.connect();

    await db.query(`INSERT INTO [Stars] ([Name], [Description], [Link]) VALUES ('${dto.name}', '${dto.description}', '${dto.link}');`);

    db.close();
}

async function updateStar(id, dto) {
    const db = new MSSQLDatabase();
    await db.connect();

    const result = await db.query(`SELECT * FROM [Stars] WHERE [Id]=${id};`);
    if (!result || result.length == 0) throw new NotFoundInDbError('Stars', id);

    await db.query(`UPDATE [Stars] SET [Name]='${dto.name}', [Description]='${dto.description}', [Link]='${dto.link}' WHERE [Id]=${id};`);

    db.close();
}

async function deleteStar(id) {
    const db = new MSSQLDatabase();
    await db.connect();

    const result = await db.query(`SELECT * FROM [Stars] WHERE [Id]=${id};`);
    if (!result || result.length == 0) throw new NotFoundInDbError('Stars', id);

    await db.query(`DELETE FROM [Stars] WHERE [Id]=${id};`);

    console.log(result);
    db.close();
}

module.exports = {
    selectAllStars,
    selectById,
    insertStar,
    updateStar,
    deleteStar
};