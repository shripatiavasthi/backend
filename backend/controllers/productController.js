const Product = require('../models/products')
const ErrorHandler = require('../utils/errorHandler')
const catchAsynErrors = require('../middlewares/catchAsynErrors')
const APIFeatures = require('../utils/apiFeatures')


exports.newProduct = catchAsynErrors( async (req, res, next) => {
    const product = await Product.create(req.body)
    res.status(201).json({ success: true, product })
})

exports.getProducts = catchAsynErrors( async (req, res, next) => {

    const apiFeatures = new APIFeatures(Product.find(),req.query).search().filter().pagination(2)
    const products = await apiFeatures.query;
    const productCount = await Product.countDocuments();
    res.status(200).json({
        success: true,
        productCount,
        count: products.length,
        message: 'This route will show all products',
        products
    })
})

exports.getProductsByID = catchAsynErrors ( async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
       return next(new ErrorHandler('Product not found', 404))
    }
        res.status(200).json({
            success: true,
            product
        })
 
})

exports.delProductsByID = catchAsynErrors(async (req, res, next) => {

    const product = await Product.findByIdAndRemove(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    } else {
        res.status(200).json({
            success: true,
        })
    }
})

exports.updateProductsByID = catchAsynErrors (async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    } 
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new : true,
        runValidators : true,
        useFindAndModify: false
    })
    res.status(200).json({
        success :true,
        product
    })
})
