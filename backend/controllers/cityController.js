const city = require('../models/city')
const ErrorHandler = require('../utils/errorHandler')
const catchAsynErrors = require('../middlewares/catchAsynErrors')
const APIFeatures = require('../utils/apiFeatures')

exports.newCity = catchAsynErrors(async (req, res, next) => {
    const City = await city.create(req.body)
    res.status(201).json({ success: true, City })
})

exports.getCity = catchAsynErrors(async (req, res, next) => {
    const apiFeatures = new APIFeatures(city.find(), req.query).search().filter()
    const cityCount = await city.countDocuments();
    const City = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: cityCount.length,
        cityCount,
        message: 'This route will show all products',
        City
    })
})

exports.getCityByID = catchAsynErrors(async (req, res, next) => {

    const City = await city.findById(req.params.id);

    if (!City) {
        return next(new ErrorHandler('Product not found', 404))
    } else {
        res.status(200).json({
            success: true,
            City
        })
    }
})



exports.delCityByID = catchAsynErrors(async (req, res, next) => {

    const City = await city.findByIdAndRemove(req.params.id);

    if (!City) {
        return next(new ErrorHandler('Product not found', 404))
    } else {
        res.status(200).json({
            success: true,
        })
    }
})

exports.updateCitysByID = catchAsynErrors(async (req, res, next) => {

    let City = await city.findById(req.params.id);

    if (!City) {
        return next(new ErrorHandler('Product not found', 404))
    }
    City = await city.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        City
    })
})
