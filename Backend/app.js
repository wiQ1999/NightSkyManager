const express = require('express');
const constellationsRouter = require('./controllers/constellations-controller');
const {
    selectAllStars,
    selectById,
    insertStar,
    updateStar,
    deleteStar
} = require('./commands/stars-commands');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/constellations', constellationsRouter);

app.post('/stars', async (req, res) => {
    try {
        res.send(await insertStar(req.body));
    } catch (error) {
        res.status(400).send(error.field);
    }
});

app.get('/stars', async (req, res) => res.send(await selectAllStars()));

app.get('/stars/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (!id) {
        res.status(400).send("Missing 'id' parameter.");
        return;
    }

    try {
        res.send(await selectById(id));
    } catch (error) {
        res.status(400).send(error.field);
    }
});

app.get('/stars/:id/constellations', async (req, res) => {
    const id = parseInt(req.params.id);
    if (!id) {
        res.status(400).send("Missing 'id' parameter.");
        return;
    }

    try {
        const star = await selectById(id);

    } catch (error) {
        res.status(400).send(error.field);
    }
});

app.put('/stars/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (!id) {
        res.status(400).send("Missing 'id' parameter.");
        return;
    }

    const body = req.body;
    if (!body) {
        res.status(400).send("Missing request body.");
        return;
    }

    try {
        res.send(await updateStar(id, body));
    } catch (error) {
        res.status(400).send(error.field);
    }
});

app.delete('/stars/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (!id) {
        res.status(400).send("Missing 'id' parameter.");
        return;
    }

    const body = req.body;
    if (!body) {
        res.status(400).send("Missing request body.");
        return;
    }

    try {
        res.send(await deleteStar(id, body));
    } catch (error) {
        res.status(400).send(error.field);
    }
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));