function selectAll(table) {
    return `SELECT * FROM [${table}];`;
}

function selectById(table, id) {
    return `SELECT * FROM [${table}] WHERE [Id]=${id};`;
}

function insert(table, dto) {
    return `INSERT INTO [${table}] ([Name], [Description], [Link]) 
        VALUES ('${dto.name}', '${dto.description}', '${dto.link}');`;
}

function updateById(table, id, dto) {
    return `UPDATE [${table}] 
        SET [Name]='${dto.name}', [Description]='${dto.description}', [Link]='${dto.link}' 
        WHERE [Id]=${id};`;
}

function deleteById(table, id) {
    return `DELETE FROM [${table}] WHERE [Id]=${id};`;
}

module.exports = {
    selectAll,
    selectById,
    insert,
    updateById,
    deleteById
};