const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    phonenumber:{
        type : Number,
        retquired : [true , "Please enter mobile no "],
        maxlength : [10 , "phone number must be in 10 digit"],
        default : 0.0
    },
})


module.exports = mongoose.model('otp', otpSchema);