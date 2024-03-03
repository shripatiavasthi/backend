const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: [true, 'please check uuid not added uuid'],
    },
    url: {
        type: String,
        required: [true, 'S3 url not provided'],
    },
    mimeType : {
        type: String,
    },
    name: {
        type: String,
        required: [true, 'name not provided'],
    },
    size : {
        type : Number,
    },
    active: {
        type: Boolean,
        default: true,
    },
    filename : {
        type : String,
        required : [true, 'filename not provided'],
    }
})

module.exports = mongoose.model('Banner', bannerSchema);
