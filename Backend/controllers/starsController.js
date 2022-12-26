const NotFoundInDbError = require('../errors/NotFoundInDbError');
const starsService = require('../services/starsService');
const express = require('express');
const validateId = require('../validators/paramsIdValidator');
const validateBaseBody = require('../validators/baseBodyValidator');

const router = express.Router();

router.post('/', validateBaseBody, async (req, res) => {
    try {
        res.send(await starsService.createStar(req.body));
    } catch (error) {
        res.status(500).send(error.field);
    }
});

router.get('/', async (req, res) => {
    try {
        res.send(await starsService.readAllStars());
    } catch (error) {
        res.status(500).send(error.field);
    }
});

router.get('/:id', validateId, async (req, res) => {
    try {
        res.send(await starsService.readStarById(req.params.id));
    } catch (error) {
        if (error instanceof NotFoundInDbError)
            res.status(404).send(error.field);
        else
            res.status(500).send(error.field);
    }
});

router.put('/:id', validateId, validateBaseBody, async (req, res) => {
    try {
        res.send(await starsService.updateStarById(req.params.id, req.body));
    } catch (error) {
        if (error instanceof NotFoundInDbError)
            res.status(404).send(error.field);
        else
            res.status(500).send(error.field);
    }
});

router.delete('/:id', validateId, async (req, res) => {
    try {
        res.send(await starsService.deleteStarById(req.params.id));
    } catch (error) {
        if (error instanceof NotFoundInDbError)
            res.status(404).send(error.field);
        else
            res.status(500).send(error.field);
    }
});

module.exports = router;