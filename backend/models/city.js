const mongoose = require('mongoose');

const cityListSchema = new mongoose.Schema({
    cityList : [{
        cityName : {
            type : String,
            required : true
        },
        alias : {
            type : String,
        }
    }]
})

module.exports = mongoose.model('cityList', cityListSchema)