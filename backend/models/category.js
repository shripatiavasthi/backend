const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'No category name added'],
    }
})

module.exports = mongoose.model('Category', categorySchema);
