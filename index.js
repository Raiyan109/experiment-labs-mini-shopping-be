const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const config = require('./app/config');
const userRoutes = require('./app/user/user.route.js')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/users', userRoutes)

mongoose.set("strictQuery", false);
mongoose.connect(config.database_url)
    .then(() => {
        app.listen(config.port, (req, res) => {
            console.log(`Experiment Labs server listening on ${config.port}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
