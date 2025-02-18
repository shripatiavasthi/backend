const Subservices = require('../models/subservices')
const ErrorHandler = require('../utils/errorHandler')
const catchAsynErrors = require('../middlewares/catchAsynErrors')
const APIFeatures = require('../utils/apiFeatures')


exports.newSubservices = catchAsynErrors(async (req, res, next) => {
    const subservices = await Subservices.create(req.body)
    res.status(201).json({ success: true, subservices })

})

exports.getSubservices = catchAsynErrors(async (req, res, next) => {
    const apiFeatures = new APIFeatures(Subservices.find(), req.query).search().filter().pagination(10)
    const categoryCount = await Subservices.countDocuments();
    const subservices = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: subservices.length,
        categoryCount,
        message: 'This route will show all subservices',
        subservices
    })
})

exports.getSubservicesByID = catchAsynErrors(async (req, res, next) => {

    const subservices = await Subservices.findById(req.params.id).populate('Subservice');

    if (!subservices) {
        return next(new ErrorHandler('Product not found', 404))
    } else {
        res.status(200).json({
            success: true,
            subservices
        })
    }
})



exports.delSubservicesByID = catchAsynErrors(async (req, res, next) => {

    const subservices = await Subservices.findByIdAndRemove(req.params.id);

    if (!subservices) {
        return next(new ErrorHandler('Product not found', 404))
    } else {
        res.status(200).json({
            success: true,
        })
    }
})

exports.updateSubservicesByID = catchAsynErrors(async (req, res, next) => {

    let subservices = await Subservices.findById(req.params.id);

    if (!subservices) {
        return next(new ErrorHandler('Product not found', 404))
    }
    subservices = await Subservices.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        subservices
    })
})
