const express = require('express')
const cors = require('cors')
const constellationsRouter = require('./controllers/constellationsController')
const starsRouter = require('./controllers/starsController')

const app = express()
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}
const port = 3000

app.use(express.json())
app.use(cors(corsOptions))

app.use('/constellations', constellationsRouter)
app.use('/stars', starsRouter)
app.listen(port, () => console.log(`NightSkyManager Web API created by Wiktor Szczeszek listening at http://localhost:${port}`))

module.exports = app
