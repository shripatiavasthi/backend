const mongoose = require('mongoose');
const validate = require('validator');


const user = new mongoose.Schema({
    name : {
        type : String,
        required : [true,'Please enter your name'],
        maxLength : [30,'name cannot exceed 30 characters'] 
    },
    email : {
        type : String,
        required : [true,'Please enter your name'],
        unique : true,
        validate : [validate.isEmail,'Please enter a valid email']
    },
    password : {
        type : String,
        requ : [true,'Please enter your password'],
        minLength : [6, 'Your password must be at least 6 characters'],
        select : false,

    },
    avatar : {
        public_id : {
            type : String,
            required : true
        },
        url : {
            type : String,
            required : true
        }
    },
    role : {
        type : String,
        default : 'user'
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date
})