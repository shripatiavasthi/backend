const Testparameter = require('../models/testparamter')
const ErrorHandler = require('../utils/errorHandler')
const catchAsynErrors = require('../middlewares/catchAsynErrors')
const APIFeatures = require('../utils/apiFeatures')


exports.newTestparameter = catchAsynErrors(async (req, res, next) => {
    const testparameter = await Testparameter.create(req.body)
    res.status(201).json({ success: true, testparameter })
})

exports.getTestparameters = catchAsynErrors(async (req, res, next) => {
    const apiFeatures = new APIFeatures(Testparameter.find(), req.query).search().filter().pagination(200)
    const TestparameterCount = await Testparameter.countDocuments();
    const testparameter = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: testparameter.length,
        TestparameterCount,
        message: 'This route will show all products',
        testparameter
    })
})

exports.getTestparameterByID = catchAsynErrors(async (req, res, next) => {

    const testparameter = await Testparameter.findById(req.params.id);

    if (!testparameter) {
        return next(new ErrorHandler('Product not found', 404))
    } else {
        res.status(200).json({
            success: true,
            testparameter
        })
    }
})



exports.delTestparameterByID = catchAsynErrors(async (req, res, next) => {

    const testparameter = await Testparameter.findByIdAndRemove(req.params.id);

    if (!testparameter) {
        return next(new ErrorHandler('Product not found', 404))
    } else {
        res.status(200).json({
            success: true,
        })
    }
})

exports.updateTestparametersByID = catchAsynErrors(async (req, res, next) => {

    let testparameter = await Testparameter.findById(req.params.id);

    if (!testparameter) {
        return next(new ErrorHandler('Product not found', 404))
    }
    testparameter = await Testparameter.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        testparameter
    })
})
