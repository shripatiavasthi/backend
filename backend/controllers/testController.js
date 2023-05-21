const Test = require('../models/test')
const ErrorHandler = require('../utils/errorHandler')
const catchAsynErrors = require('../middlewares/catchAsynErrors')
const APIFeatures = require('../utils/apiFeatures')


exports.newTest = catchAsynErrors(async (req, res, next) => {
    const test = await Test.create(req.body)
    res.status(201).json({ success: true, test })
})

exports.getTests = catchAsynErrors(async (req, res, next) => {
    const apiFeatures = new APIFeatures(Test.find(), req.query).search().filter().pagination(10)
    const TestCount = await Test.countDocuments();
    const test = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: test.length,
        TestCount,
        message: 'This route will show all products',
        test
    })
})

exports.getTestByID = catchAsynErrors(async (req, res, next) => {

    const test = await Test.findById(req.params.id).populate('testParameters');

    if (!test) {
        return next(new ErrorHandler('Product not found', 404))
    } else {
        res.status(200).json({
            success: true,
            test
        })
    }
})



exports.delTestByID = catchAsynErrors(async (req, res, next) => {

    const test = await Test.findByIdAndRemove(req.params.id);

    if (!test) {
        return next(new ErrorHandler('Product not found', 404))
    } else {
        res.status(200).json({
            success: true,
        })
    }
})

exports.updateTestsByID = catchAsynErrors(async (req, res, next) => {

    let test = await Test.findById(req.params.id);

    if (!test) {
        return next(new ErrorHandler('Product not found', 404))
    }
    test = await Test.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        test
    })
})
