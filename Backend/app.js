const express = require('express');
const {
    selectAllStars,
    selectById,
    insertStar,
    updateStar,
    deleteStar
} = require('./Commands/StarsCommands');
const app = express();
app.use(express.json());
const port = 3000;

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