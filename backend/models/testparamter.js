const mongoose = require('mongoose');

const testParameterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter title cannot be empty'],
        trim: true,
        unique: true
    }
}, { timestamps: true })

module.exports = mongoose.model('testParameter', testParameterSchema)