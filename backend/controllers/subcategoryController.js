const Subcategory = require('../models/subcategory')
const ErrorHandler = require('../utils/errorHandler')
const catchAsynErrors = require('../middlewares/catchAsynErrors')
const APIFeatures = require('../utils/apiFeatures')

exports.newSubcategory = catchAsynErrors(async (req, res, next) => {
    const subcategory = await Subcategory.create(req.body)
    res.status(201).json({ success: true, subcategory })
})

exports.getSubCategory = catchAsynErrors(async (req, res, next) => {
    const apiFeatures = new APIFeatures(Subcategory, req.query).search().filter().pagination(2)
    const subcategoryCount = await Subcategory.countDocuments();
    const subcategory = await apiFeatures.query
    res.status(200).json({
        success: true,
        count: subcategory.length,
        subcategoryCount,
        message: 'This route will show all products',
        subcategory
    })
})

exports.getSubCategoryByID = catchAsynErrors(async (req, res, next) => {

    const subcategory = await Subcategory.findById(req.params.id);

    if (!subcategory) {
        return next(new ErrorHandler('Product not found', 404))
    } else {
        res.status(200).json({
            success: true,
            subcategory
        })
    }
})

exports.delSubCategoryByID = catchAsynErrors(async (req, res, next) => {

    const subcategory = await Subcategory.findByIdAndRemove(req.params.id);

    if (!subcategory) {
        return next(new ErrorHandler('Product not found', 404))
    } else {
        res.status(200).json({
            success: true,
        })
    }
})

exports.updateSubCategorysByID = catchAsynErrors(async (req, res, next) => {

    let subcategory = await Subcategory.findById(req.params.id);

    if (!subcategory) {
        return next(new ErrorHandler('Product not found', 404))
    } 
    subcategory = await Subcategory.findByIdAndUpdate(req.params.id,req.body,{
        new : true,
        runValidators : true,
        useFindAndModify: false
    })
    res.status(200).json({
        success :true,
        subcategory
    })
})