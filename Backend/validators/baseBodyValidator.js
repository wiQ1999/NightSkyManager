function validateBaseBody(req, res, next) {
    const body = req.body;

    const propExist = validatePropertiesExist(body, ['name', 'description', 'link', 'related'])
    if (!propExist.isValid) {
        res.status(400).send(propExist.message);
        return;
    }

    const stringType = validateNotEmptyStringType(body, ['name']);
    if (!stringType.isValid) {
        res.status(400).send(stringType.message);
        return;
    }

    const stringOrNullType = validateStringOrNullType(body, ['description', 'link']);
    if (!stringOrNullType.isValid) {
        res.status(400).send(stringOrNullType.message);
        return;
    }

    const intArrayType = validateIntArrayType(body, ['related']);
    if (!intArrayType.isValid) {
        res.status(400).send(intArrayType.message);
        return;
    }

    res.status(400).send("TESTING");
    return;

    next();
}

function validatePropertiesExist(body, propNames) {
    let result = {
        isValid: true,
        message: ""
    };

    for (let i = 0; i < propNames.length; i++) {
        const propName = propNames[i];

        if (!body.hasOwnProperty(propName)) {
            result.isValid = false;
            result.message = `Missing "${propName}" property in request body.`;
            return result;
        }
    }

    return result;
}

function validateNotEmptyStringType(body, propNames) {
    let result = {
        isValid: true,
        message: ""
    };

    for (let i = 0; i < propNames.length; i++) {
        const propName = propNames[i];
        const prop = body[propName];

        if (typeof prop !== 'string' || prop === "") {
            result.isValid = false;
            result.message = `Property "${propName}" require not empty string type value in request body.`;
            return result;
        }
    }

    return result;
}

function validateStringOrNullType(body, propNames) {
    let result = {
        isValid: true,
        message: ""
    };

    for (let i = 0; i < propNames.length; i++) {
        const propName = propNames[i];
        const prop = body[propName];

        if (typeof prop !== 'string' && prop !== null) {
            result.isValid = false;
            result.message = `Property "${propName}" require string or null type value in request body.`;
            return result;
        }
    }

    return result;
}

function validateIntArrayType(body, propNames) {
    let result = {
        isValid: true,
        message: ""
    };

    for (let i = 0; i < propNames.length; i++) {
        const propName = propNames[i];
        const prop = body[propName];

        if (!Array.isArray(prop) || !prop.every(Number.isInteger)) {
            result.isValid = false;
            result.message = `Property "${propName}" require int array type values in request body.`;
            return result;
        }
    }

    return result;
}

module.exports = validateBaseBody;