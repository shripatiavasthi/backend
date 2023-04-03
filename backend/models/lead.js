const mongoose = require('mongoose');

const leadModel = new mongoose.Schema({
    phoneNumber : {
        type : Number,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    city : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'city',
    },
    leadStatus : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'leadStatus',
    },
    leadType : {
        type: String,
        
    }
   
})