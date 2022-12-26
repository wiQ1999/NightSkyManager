function selectLastId(table) {
    return `SELECT MAX([id]) AS 'id' FROM [${table}];`;
}

module.exports = {
    selectLastId
}