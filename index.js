const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const config = require('./app/config');
const userRoutes = require('./app/modules/user/user.route.js')
const productRoutes = require('./app/modules/product/product.route.js')
const cartRoutes = require('./app/modules/cart/cart.route.js')
const orderRoutes = require('./app/modules/order/order.route.js')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)

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
