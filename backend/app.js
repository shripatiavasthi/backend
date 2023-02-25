const express = require('express')
const app = express()
const errorMiddleware = require('./middlewares/errors')

app.use(express.json());

// Import all routes
const products = require('./routes/product');
const category = require('./routes/category');
const subcategory = require('./routes/subcategory');

app.use('/api/v1',products)
app.use('/api/v1',category)
app.use('/api/v1',subcategory)

// Middleware to handle errors
app.use(errorMiddleware)
module.exports = app