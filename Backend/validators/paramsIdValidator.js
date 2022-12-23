function validateId(req, res, next) {
    let id = req.params.id;
    if (!id) {
        res.status(400).send('Missing "id" parameter in URL address.');
        return;
    }

    if (!parseInt(id)) {
        res.status(400).send('Parameter "id" is not an integer.');
        return;
    }

    next();
}

module.exports = validateId;