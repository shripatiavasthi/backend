const Order = require('../models/order')
const Product = require('../models/products')
const ErrorHandler = require('../utils/errorHandler')
const catchAsynErrors = require('../middlewares/catchAsynErrors')

exports.newOrders = catchAsynErrors(async function (req, res, next) {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        order
    })
})

exports.getSingleOrder = catchAsynErrors(async (req, res, next) => {
    const order = await Order.findById({ id: req.params.id }).populate('user', 'name email')
    if (!order) {
        return next(new ErrorHandler('No order found with this ID', 404))
    }
    res.status(200).json({
        success: true,
        order
    })
})

exports.myorders = catchAsynErrors(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id })
    res.status(200).json({ success: true, orders })
})

exports.allOrders = catchAsynErrors(async (req, res, next) => {
    const orders = await Order.find()
    let totalAmount = 0;
    orders.forEach(order =>{
        totalAmount += order.totalPrice
    })
    res.status(200).json({ success: true,totalAmount,orders })
})