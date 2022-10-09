const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name cannot be empty'],
        trim: true,
        maxLenght: [100, 'Name enter cannot exceed 100 characters'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter price cannot be empty'],
        default: 0.0,
        maxLenght: [5, 'Price cannot exceed 5 characters'],
    },
    description: {
        type: String,
        required: [true, 'Please enter description cannot be empty'],
        maxLenght: [500, 'Descriptiom cannot exceed 5 characters'],
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true,
            }
        }],
    category: {
        type: String,
        required: [true, 'Please enter category cannot be empty'],
        enum: {
            values: [
                'Electronics',
                'Camera',
                'Beauty',
                'Food',
                'Clothes',
                'Shoes',
                'Sports',
                'TV'
            ],
            message: 'Please enter correct category',
        },
    },
    seller: {
        type: String,
        required: [true, 'Please enter seller cannot be empty'],
    },
    stock: {
        type: Number,
        required: [true, 'Please enter stock cannot be empty'],
        maxLenght: [5, 'Stock enter cannot exceed 5 characters'],
        default: 0
    },
    numOfReview: {
        type: Number,
        default: 0
    },
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

}, { timestamps: true })

module.exports = mongoose.model('Products', productSchema)