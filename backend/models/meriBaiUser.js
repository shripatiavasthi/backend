const mongoose = require('mongoose');
const validate = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')


const meriBaiuserSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: [30, 'name cannot exceed 30 characters']
    },
    email: {
        type: String,
        validate: [validate.isEmail, 'Please enter a valid email']
    },
    otp : {
        type: String,
    },
    avatar: {
        public_id: {
            type: String,
            // required : true
        },
        url: {
            type: String,
            // required : true
        }
    },
    phoneNumber : {
        type : Number,
        required: [true, 'Please enter your phone number'],
    },
    long : {
        type : Number
    },
    lat : {
        type : Number,
    },
    address: {
        type: String,
        default: 'address'
    },
    newUser : {
        type : Boolean,
        default : true
    },
    role: {
        type: String,
        default: 'user'
    },
    verifiedUser : {
        type : Boolean,
        default : false,
    },
    disabled : {
        type : Boolean,
        default : false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

meriBaiuserSchema.methods.getjwtToken = function () {
    return jwt.sign({ id : this._id}, process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRES_TIME 
    })
}

module.exports = mongoose.model('meriBaiuser', meriBaiuserSchema);