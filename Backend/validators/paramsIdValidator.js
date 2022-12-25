function validateId(req, res, next) {
    let id = req.params.id;
    if (typeof id !== "number") {
        res.status(400).send('Missing "id" parameter as a number in URL address.');
        return;
    }

    next();
}

module.exports = validateId;