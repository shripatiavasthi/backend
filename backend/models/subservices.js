const mongoose = require('mongoose');

const subservicesSchema = new mongoose.Schema({
    service : {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Service"
    },
    url : {
        type: String,
        required: [true,'icon url not provided'],
    },
    name : {
        type: String,
        required: [true,'name not provided'],
    },
    active : {
        type: Boolean,
        default : true,
    },
    sortorder : {
        type : Number,
        default : 0
    }
})

module.exports = mongoose.model('Subservice', subservicesSchema);
