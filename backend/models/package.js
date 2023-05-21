const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    testName: {
        type: String,
        required: [true, 'Please enter name cannot be empty'],
        trim: true
    },
    costPrice: {
        type: Number,
        required: [true, 'Please enter price cannot be empty'],
        default: 0.0,
        maxLenght: [5, 'Price cannot exceed 5 characters'],
    },
    mrpPrice: {
        type: Number,
        required: [true, 'Please enter price cannot be empty'],
        default: 0.0,
        maxLenght: [5, 'Price cannot exceed 5 characters'],
    },
    slug: {
        type: String,
        required: [true, 'Please enter slug cannot be empty'],
        unique: true,
    },
    packageDescirption: {
        type: String
    },
    packageCriteria: [{
        Q: {
            type: String
        },
        A: {
            type: String,
        }
    }],
    ratings: {
        type: Number,
        default: 0
    },
    banner: [
        {
            url: {
                type: String,
                required: true,
            }
        }],
    reviews: [{
        name: {
            type: String,
            required: true,
        },
        ratings: {
            type: Number,
            required: true
        },
        comment: {
            type: String,
            required: true,
        }
    }],
    packageParameters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'test',
    }],
    fasting: {
        type: Boolean,
        default: false
    },
    homeCollection: {
        type: Boolean,
        default : true,
        required: [true, 'Please enter fasting cannot be empty'],
    },
    gender : {
        type: String,
        enum : ['male','female','all'],
        required: [true, 'Please enter gender cannot be empty']
    }
}, { timestamps: true })

module.exports = mongoose.model('package', packageSchema)