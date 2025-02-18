const Services = require('../models/services')
const ErrorHandler = require('../utils/errorHandler')
const catchAsynErrors = require('../middlewares/catchAsynErrors')
const APIFeatures = require('../utils/apiFeatures')


exports.newServices = catchAsynErrors(async (req, res, next) => {
    const services = await Services.create(req.body)
    res.status(201).json({ success: true, services })

})

exports.getServices = catchAsynErrors(async (req, res, next) => {
    const apiFeatures = new APIFeatures(Services.find(), req.query).search().filter().pagination(10)
    const categoryCount = await Services.countDocuments();
    const services = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: services.length,
        categoryCount,
        message: 'This route will show all services',
        data : services
    })
})

exports.getServicesByID = catchAsynErrors(async (req, res, next) => {

    const services = await Services.findById(req.params.id).populate('Subservice');

    if (!services) {
        return next(new ErrorHandler('Product not found', 404))
    } else {
        res.status(200).json({
            success: true,
            services
        })
    }
})



exports.delServicesByID = catchAsynErrors(async (req, res, next) => {

    const services = await Services.findByIdAndRemove(req.params.id);

    if (!services) {
        return next(new ErrorHandler('Product not found', 404))
    } else {
        res.status(200).json({
            success: true,
        })
    }
})

exports.updateServicesByID = catchAsynErrors(async (req, res, next) => {

    let services = await Services.findById(req.params.id);

    if (!services) {
        return next(new ErrorHandler('Product not found', 404))
    }
    services = await Services.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        services
    })
})
