const express = require("express")
const app = express()

const errorHandler = require('./middlewares/error')

app.use(express.json())

// Import all routes

const products = require('./routes/products')

app.use('/api/v1' , products)

app.use(errorHandler);

module.exports = app 