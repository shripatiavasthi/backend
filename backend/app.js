const express = require('express')
const app = express()

app.use(express.json());

const products = require('./routes/product');
const category = require('./routes/category');
const subcategory = require('./routes/subcategory');

app.use('/api/v1',products)
app.use('/api/v1',category)
app.use('/api/v1',subcategory)

module.exports = app