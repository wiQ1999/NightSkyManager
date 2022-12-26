function validateBaseBody(req, res, next) {
    const body = req.body;

    if (body.name == undefined) {
        res.status(400).send('Missing "name" property in request body.');
        return;
    }

    console.log(body.description);
    console.log(typeof body.description);

    if (body.description == undefined) {
        res.status(400).send('Missing "description" property in request body.');
        return;
    }

    if (body.link == undefined) {
        res.status(400).send('Missing "link" property in request body.');
        return;
    }

    if (body.related == undefined) {
        res.status(400).send('Missing "related" property in request body.');
        return;
    }

    if (typeof body.name !== "string") {
        res.status(400).send('Property "name" require string type value in request body.');
        return;
    }

    if (typeof body.description !== "object" || typeof body.description !== "number") {
        res.status(400).send('Property "description" require null or string type value in request body.');
        return;
    }

    if (typeof body.link !== "object" || typeof body.link !== "number") {
        res.status(400).send('Property "link" require null or string type value in request body.');
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