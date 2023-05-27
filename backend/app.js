const express = require('express')
const app = express()
const errorMiddleware = require('./middlewares/errors')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const fs = require('fs')

app.use(cors({origin: '*'}));
app.use(express.json());
app.use(cookieParser())

// Import all routes
const test = require('./routes/test');
const testparameter = require('./routes/testParameter');
const products = require('./routes/product');
const category = require('./routes/category');
const subcategory = require('./routes/subcategory');
const order = require('./routes/order');
const lead = require('./routes/lead');
const leadStatus = require('./routes/leadStatus');
const city = require('./routes/city');
const auth = require('./routes/auth');



app.use('/api/v1',auth)
app.use('/api/v1',products)
app.use('/api/v1',category)
app.use('/api/v1',subcategory)
app.use('/api/v1',order)
app.use('/api/v1',lead)
app.use('/api/v1',city)
app.use('/api/v1',leadStatus)
app.use('/api/v1',test)
app.use('/api/v1',testparameter)


app.get('/.well-known/pki-validation/548834493E36F9B66AC5F75A240BD578.txt',(req, res, next) =>{
    res.sendFile('/Users/Projects/Backend/backend/548834493E36F9B66AC5F75A240BD578.txt')
})
app.use('/',(req, res, next) =>{
    res.send('backend working')
})


// Middleware to handle errors
app.use(errorMiddleware)
module.exports = app