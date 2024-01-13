const Product = require('../models/product')
const dotenv  = require('dotenv')
const connectDatabase = require('../config/database');

const products = require('../data/product')



// setting dotenv file

dotenv.config({  path : 'backend/config/config.env'})

connectDatabase();

const seedProducts = async () => {
    try{

        await Product.deleteMany();
        console.log('Product deleted successfully')

        await Product.insertMany(products);
        console.log('Product inserted successfully')

        process.exit();


    }catch(err){
        console.log(err.message , "error in seede")
        process.exit();
    }
}

seedProducts()