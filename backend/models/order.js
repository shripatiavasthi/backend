const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phoneNo: {
            type: Number,
            required: true
        },
        postalCode: {
            type: Number,
            required: true
        },
        country: {
            type: String,
            required: true
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    orderItems: [{
        names: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
        }

    }],
    paymentInfo: {
        id: {
            type: String,
        },
        status: {
            type: String,
        }
    },
    itemsPrice: {
        type: Number,
        required: true
    },
    taxPrice: {
        type: Number,
        required: true
    },
    shippingPrice: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    paidAt: {
        type: Date,
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'processing'
    },
    delieveredAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
    }

})

module.exports = mongoose.model('order', orderSchema)