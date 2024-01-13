const product = require('../models/product');
const Product = require('../models/product');
const Bhairegister = require('../models/customerlatlong');
const otp = require('../models/otp');

const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')

const APIFeatures = require('../utils/apiFeatures')

exports.newProduct = async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        sucess: true,
        message: "This route will create a new product in databaase",
        product
    })
}

exports.Bhairegistration = async (req, res, next) => {
    const Lat_long = await Bhairegister.create(req.body);

    res.status(201).json({
        sucess: true,
        message: "this route will create a new bhai in databaase",
        Lat_long
    })
}


exports.otpverify = async (req, res, next) => {
    const Otp = await otp.create(req.body);

    res.status(201).json({
        sucess: true,
        Otp
    })
}



// get all the products from the datbase  => api/vi/products
exports.getProducts = catchAsyncError ( async (req, res, next) => {

    //const apiFeatures = new ApiFeatures(Product.find(),req.query).serach()

     const product = await Product.find()

    //const product = await apiFeatures.query

    res.status(200).json({
        sucess: true,
        count: product.length,
        product
    })
} )

// get sinbgle products => /vi/product/:id

exports.getSingleProduct = catchAsyncError ( async (req, res, next) => {

    const product = await Product.findById(req.params.id)

    if(!product){
        // return res.status(404).json({
        //             sucess: false,
        //             message: "Product not found"
        //         })
        return next(new ErrorHandler("Product not found" , 400));
    }

    res.status(200).json({
            sucess: true,
            product
        })
} )

// admin update product 

exports.updateProduct = catchAsyncError ( async (req, res, next) => {
    let product = await Product.findById(req.param.id);
    if(!product){
        return res.status(404).json({
            sucess : 'false',
            message : 'Product not found'
        })
    }

    product = await Product.findByIdAndUpdate(req.param.id, req.body , {
        new : true,
        runValidators : true
    });

    res.send(200).json({
        sucess : true,
        product
    })

} )
 
// Delete product

exports.deleteProduct = catchAsyncError ( async (req, res, next) => {

    const product = await Product.findById(req.param.id);

    if(!product){
        return res.status(404).json({
            sucess:false,
            message : 'Product not found'
        })
    }

    await product.remove();

    res.status(200).json({
        sucess:true,
        message:"Product is deleted"
    })

} )