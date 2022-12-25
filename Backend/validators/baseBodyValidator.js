function validateBaseBody(req, res, next) {
    const body = req.body;

    if (typeof body.name !== "string") {
        res.status(400).send('Missing "name" property as a string in request body.');
        return;
    }

    if (typeof body.description !== "string") {
        res.status(400).send('Missing "description" property as a string in request body.');
        return;
    }

    if (typeof body.link !== "string") {
        res.status(400).send('Missing "link" property as a string in request body.');
        return;
    }

    if (!Array.isArray(body.related) || !body.related.every(Number.isInteger)) {
        res.status(400).send('Missing "related" property as an integers array in request body.');
        return;
    }

    if (!body.name) {
        res.status(400).send('Value for property "name" is required.');
        return;
    }
    next();
}

module.exports = validateBaseBody;