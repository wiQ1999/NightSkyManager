function validateId(req, res, next) {
    let id = req.params.id;
    if (!id) res.status(400).send('Missing "id" parameter in URL address.');

    id = parseInt(id);
    if (!id) res.status(400).send('Parameter "id" is not an integer.');

    next();
}

module.exports = validateId;