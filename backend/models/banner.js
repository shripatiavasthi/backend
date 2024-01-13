const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    banners : [{
    uuid : {
        type: String,
        required: [true,'please check uuid not added uuid'],
    },
    url : {
        type: String,
        required: [true,'S3 url not provided'],
    },
    name : {
        type: String,
        required: [true,'name not provided'],
    },
    active : {
        type: Boolean,
        default : false,
    }
}]
})

module.exports = mongoose.model('Banner', bannerSchema);
