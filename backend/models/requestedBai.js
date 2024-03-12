const mongoose = require('mongoose');

const requestedBaiSchema = new mongoose.Schema({
    bai_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'meriBaiuser',
        required: [true,'Bai id cannot be empty'],
    },
    request_by: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'meriBaiuser',
        required: [true,'owner id connot be empty'],
    }]
})

module.exports = mongoose.model('requestedBai', requestedBaiSchema);