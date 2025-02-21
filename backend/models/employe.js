const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const vitalCareUserSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: [60, 'name cannot exceed 60 characters']
    },
    nationality: {
        type: String,
        required: false,
    },
    address : {
        type: String,
        required: false
    },
    age : {
        type: String,
        required: false
    },
    phoneNumber : {
        type : Number,
        required: [true, 'Please enter your phone number'],
        unique: true
    },
    email : {
        type: String,
        required: false
    },
    dob : {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'employee',
        required: false,
    },
    experience: {
        type: Number,
        required: false,
    },
    subservice : {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Subservice"
    },
    presentWokingPlace: {
        type: String,
        required: false,
    },
    gender : {
        type: String,
        required: false,
    },
    bloodGrp : {
        type: String,
        required: false,
    },
    married : {
        type: Boolean,
        required: false,
    },
    dl : {
        type: Boolean,
        required: false,
    },
    qualification : {
        type: String,
        required: false,
    },
    resume : {
        type: String,
        required: false,
    },
    diploma : {
        type: String,
        required: false,
    },
    exp : {
        type: String,
        required: false,
    },
    medicalHistory : {
        type: String,
        required: false,
    },
    verifiedUser : {
        type : Boolean,
        required: false,
        default : false,
    },
    disabled : {
        type : Boolean,
        required: false,
        default : true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('vitalCareEmp', vitalCareUserSchema);