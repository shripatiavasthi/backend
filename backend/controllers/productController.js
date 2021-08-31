const Product = require('../models/products')

exports.newProduct = async (req, res, next) => {
    const product = await Product.create(req.body)
    res.status(201).json({ success: true, product })
}

exports.getProducts = async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        count: products.length,
        message: 'This route will show all products',
        products
    })
}

exports.getProductsByID = async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404).json({
            success: false,
            message: 'No product with this id'
        })
    } else {
        res.status(200).json({
            success: true,
            product
        })
    }
}

exports.delProductsByID = async (req, res, next) => {

    const product = await Product.findByIdAndRemove(req.params.id);

    if (!product) {
        res.status(404).json({
            success: false,
            message: 'No product with this id'
        })
    } else {
        res.status(200).json({
            success: true,
        })
    }
}

exports.updateProductsByID = async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404).json({
            success: false,
            message: 'No product with this id'
        })
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
}
