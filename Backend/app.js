const express = require('express');
const constellationsRouter = require('./controllers/constellationsController');
const starsRouter = require('./controllers/starsController');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/constellations', constellationsRouter);
app.use('/stars', starsRouter);
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));