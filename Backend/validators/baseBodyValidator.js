function validateBaseBody(req, res, next) {
    const body = req.body;

    if (body.name === undefined) {
        res.status(400).send('Missing "name" property in request body.');
        return;
    }

    if (body.description === undefined) {
        res.status(400).send('Missing "description" property in request body.');
        return;
    }

    if (body.link === undefined) {
        res.status(400).send('Missing "link" property in request body.');
        return;
    }

    if (!body.name) {
        res.status(400).send('Value for property "name" is required.');
        return;
    }

    next();
}

module.exports = validateBaseBody;