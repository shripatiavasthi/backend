const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type : String,
        retquired : [true , "Please enter [product name "],
        trim : true,
        maxlength : [100 , "product name can't exceed 100 characters"]
    }, 
    price:{
        type : Number,
        retquired : [true , "Please enter product name "],
        maxlength : [5 , "product name can't exceed 100 characters"],
        default : 0.0
    },
    description:{
        type : String,
        retquired : [true , "Please enter product name "],
        maxlength : [300 , "product name can't exceed 100 characters"],
    },
})


module.exports = mongoose.model('Product', productSchema);