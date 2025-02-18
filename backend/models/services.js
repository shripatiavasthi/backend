const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
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
        default : false,
    },
    sortorder : {
        type : Number,
        default : 0
    }
})

module.exports = mongoose.model('Service', servicesSchema);
