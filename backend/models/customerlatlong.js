const mongoose = require('mongoose')

const BhaiSchema = new mongoose.Schema({
    lat:{
        type : Number,
        retquired : [true , "Please enter a latitude"],
        maxlength : [15 , "latitude must be given"],
        default : 0.0
    },
    long:{
        type : Number,
        retquired : [true , "Please enter a longitude"],
        maxlength : [15 , "longitude must be given"],
        default : 0.0
    },
    Firstname:{
        type : String,
        retquired : [true , "Please enter bhai name"],
        trim : true,
        maxlength : [100 , "product name can't exceed 100 characters"]
    }, 
    Lastname:{
        type : String,
        retquired : [true , "Please enter bhai last name"],
        trim : true,
        maxlength : [100 , "product name can't exceed 100 characters"]
    }, 
    address:{
        type : String,
        retquired : [true , "Please enter bhai last name"],
        trim : true,
        maxlength : [100 , "product name can't exceed 100 characters"]
    }, 
    phonenumber:{
        type : Number,
        retquired : [true , "Please enter phonenumber number"],
        maxlength : [10 , "product name can't exceed 100 characters"],
        default : 0.0
    },
})


module.exports = mongoose.model('Bhairegister', BhaiSchema);