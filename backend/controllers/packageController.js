const Package = require('../models/package')
const ErrorHandler = require('../utils/errorHandler')
const catchAsynErrors = require('../middlewares/catchAsynErrors')
const APIFeatures = require('../utils/apiFeatures')


exports.newPackage = catchAsynErrors(async (req, res, next) => {
    const package = await Package.create(req.body)
    res.status(201).json({ success: true, package })
})

exports.getPackages = catchAsynErrors(async (req, res, next) => {
    const apiFeatures = new APIFeatures(Package.find(), req.query).search().filter().pagination(10)
    const PackageCount = await Package.countDocuments();
    const package = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: package.length,
        PackageCount,
        message: 'This route will show all products',
        package
    })
})

exports.getPackageByID = catchAsynErrors(async (req, res, next) => {

    const package = await Package.findById(req.params.id).populate('packageParameters');

    if (!package) {
        return next(new ErrorHandler('Product not found', 404))
    } else {
        res.status(200).json({
            success: true,
            package
        })
    }
})



exports.delPackageByID = catchAsynErrors(async (req, res, next) => {

    const package = await Package.findByIdAndRemove(req.params.id);

    if (!package) {
        return next(new ErrorHandler('Product not found', 404))
    } else {
        res.status(200).json({
            success: true,
        })
    }
})

exports.updatePackagesByID = catchAsynErrors(async (req, res, next) => {

    let package = await Package.findById(req.params.id);

    if (!package) {
        return next(new ErrorHandler('Product not found', 404))
    }
    package = await Package.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        package
    })
})
