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

const locations = [
    { "id": 279, "longitude": 79.853239, "latitude": 6.912283 },
    { "id": 284, "longitude": 79.865699, "latitude": 6.885697 },
    { "id": 13, "longitude": 79.851187, "latitude": 6.912220 },
    { "id": 282, "longitude": 79.858904, "latitude": 6.871041 },
    { "id": 281, "longitude": 79.853346, "latitude": 6.899757 },
    { "id": 16, "longitude": 79.854786, "latitude": 6.894039 }
  ]
  

// calculating distance 

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c // in metres
}

// get all bai data 
exports.getallBai = catchAsyncError ( async ( req , res , next ) => {
    const alldata = []
    for ( let i = 0; i < locations.length; i++ ) {
        const distance = calculateDistance(6.912283 , 79.853239 , locations[i].latitude , locations[i].longitude )
        console.log(distance / 1000 , "the distance")
        if(distance < 10){
            alldata.push(locations[i])
        }
    }
    console.log("all bai data ", alldata)
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