function validateId(req, res, next) {
    let id = req.params.id;
    if (id == undefined) {
        res.status(400).send('Missing "id" parameter in URL address.');
        return;
    }

    if (!/^[0-9]+$/.test(id)) {
        res.status(400).send('Parameter "id" is not a number in URL address.');
        return;
    }

    next();
}

module.exports = validateId;