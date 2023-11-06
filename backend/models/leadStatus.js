const mongoose = require('mongoose');

const leadStatusSchema = new mongoose.Schema({
        leadStatus : {
            type : String,
            required : true
        }
})

module.exports = mongoose.model('leadStatus', leadStatusSchema)