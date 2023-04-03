const express = require('express')
const app = express()
const errorMiddleware = require('./middlewares/errors')
const cookieParser = require('cookie-parser')
const cors = require('cors')

app.use(cors({origin: '*'}));
app.use(express.json());
app.use(cookieParser())

// Import all routes
const products = require('./routes/product');
const category = require('./routes/category');
const subcategory = require('./routes/subcategory');
const order = require('./routes/order');
const auth = require('./routes/auth');


app.use('/api/v1',auth)
app.use('/api/v1',products)
app.use('/api/v1',category)
app.use('/api/v1',subcategory)
app.use('/api/v1',order)

// Middleware to handle errors
app.use(errorMiddleware)
module.exports = app