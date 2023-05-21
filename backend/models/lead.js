const mongoose = require('mongoose');

const leadModelSchema = new mongoose.Schema({
    phoneNumber : {
        type : Number,
        required : true
    },
    email : {
        type : String,
    },
    city : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'cityList',
    },
    leadStatus : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'leadStatus',
    },
    url : {
        type : String,
    },
    leadSource : {
        type: String,
    },
    pending : {
        type : Date
    }
},{ timestamps: true })

module.exports = mongoose.model('lead', leadModelSchema)