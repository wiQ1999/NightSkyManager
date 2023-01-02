function selectAll(table) {
    return `SELECT * FROM [${table}];`
}

function selectById(table, id) {
    return `SELECT * FROM [${table}] WHERE [id]=${id};`
}

function insert(table, dto) {
    return `INSERT INTO [${table}] ([name], [description], [link]) 
        VALUES ('${dto.name}', '${dto.description}', '${dto.link}');`
}

function updateById(table, id, dto) {
    return `UPDATE [${table}] 
        SET [name]='${dto.name}', [description]='${dto.description}', [link]='${dto.link}' 
        WHERE [id]=${id};`
}

function deleteById(table, id) {
    return `DELETE FROM [${table}] WHERE [id]=${id};`
}

module.exports = {
    selectAll,
    selectById,
    insert,
    updateById,
    deleteById
}