const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const config = require('./app/config');

require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())


mongoose.set("strictQuery", false);
mongoose.connect(config.database_url)
    .then(() => {
        app.listen(config.port, (req, res) => {
            console.log(`Experiment Server listening on ${config.port}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
