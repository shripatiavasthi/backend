const mongoose = require('mongoose');

const cityListSchema = new mongoose.Schema({
        cityName : {
            type : String,
            unique: true,
            required : true
        },
        alias : [{
            type : String,
        }]
})

module.exports = mongoose.model('cityList', cityListSchema)