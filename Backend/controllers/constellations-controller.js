const NotFoundInDbError = require('../errors/NotFoundInDbError');
const express = require('express');
const validateId = require('../validators/params-id-validator');
const validateBaseBody = require('../validators/base-body-validator');
const {
    selectAllConstellations,
    selectConstellationById,
    insertConstellation,
    updateConstellation,
    deleteConstellation
} = require('../commands/constellations-commands');

const router = express.Router();

router.post('/', validateBaseBody, async (req, res) => {
    try {
        res.send(await insertConstellation(req.body));
    } catch (error) {
        res.status(500).send(error.field);
    }
});

router.get('/', async (req, res) => {
    try {
        res.send(await selectAllConstellations());
    } catch (error) {
        res.status(500).send(error.field);
    }
});

router.get('/:id', validateId, async (req, res) => {
    try {
        const constellation = await selectConstellationById(req.params.id);
        // TODO: dodać pobieranie z komend Stars wg. id konstelacji
        //
        // SELECT [Stars].*, [Constellations].*
        // FROM [Stars]
        // INNER JOIN [Stars_Constellations] ug ON ug.user_id = u.id
        // INNER JOIN [Constellations] g ON g.id = ug.group_id
        res.send();
    } catch (error) {
        if (error instanceof NotFoundInDbError)
            res.status(404).send(error.field);
        else
            res.status(500).send(error.field);
    }
});

router.get('/:id/stars', validateId, async (req, res) => {
    try {
        res.send(await selectConstellationById(req.params.id));
    } catch (error) {
        if (error instanceof NotFoundInDbError)
            res.status(404).send(error.field);
        else
            res.status(500).send(error.field);
    }
});

router.put('/:id', validateId, validateBaseBody, async (req, res) => {
    try {
        res.send(await updateConstellation(req.params.id, req.body));
    } catch (error) {
        if (error instanceof NotFoundInDbError)
            res.status(404).send(error.field);
        else
            res.status(500).send(error.field);
    }
});

router.delete('/:id', validateId, async (req, res) => {
    try {
        res.send(await deleteConstellation(req.params.id));
    } catch (error) {
        if (error instanceof NotFoundInDbError)
            res.status(404).send(error.field);
        else
            res.status(500).send(error.field);
    }
});

module.exports = router;