const NotFoundInDbError = require('../errors/NotFoundInDbError');
const constellationsService = require('../services/constellationsService');
const express = require('express');
const validateId = require('../validators/paramsIdValidator');
const validateBaseBody = require('../validators/baseBodyValidator');

const router = express.Router();

router.post('/', validateBaseBody, async (req, res) => {
    try {
        res.send(await constellationsService.createConstellation(req.body));
    } catch (error) {
        res.status(500).send(error.field);
    }
});

router.get('/', async (req, res) => {
    try {
        res.send(await constellationsService.readAllConstellations());
    } catch (error) {
        res.status(500).send(error.field);
    }
});

router.get('/:id', validateId, async (req, res) => {
    try {
        res.send(await constellationsService.readConstellationById(req.params.id));
    } catch (error) {
        if (error instanceof NotFoundInDbError)
            res.status(404).send(error.field);
        else
            res.status(500).send(error.field);
    }
});

router.put('/:id', validateId, validateBaseBody, async (req, res) => {
    try {
        res.send(await constellationsService.updateConstellationById(req.params.id, req.body));
    } catch (error) {
        if (error instanceof NotFoundInDbError)
            res.status(404).send(error.field);
        else
            res.status(500).send(error.field);
    }
});

router.delete('/:id', validateId, async (req, res) => {
    try {
        res.send(await constellationsService.deleteConstellationById(req.params.id));
    } catch (error) {
        if (error instanceof NotFoundInDbError)
            res.status(404).send(error.field);
        else
            res.status(500).send(error.field);
    }
});

module.exports = router;