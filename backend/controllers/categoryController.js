const Category = require('../models/category')
const ErrorHandler = require('../utils/errorHandler')
const catchAsynErrors = require('../middlewares/catchAsynErrors')
const APIFeatures = require('../utils/apiFeatures')

exports.newCategory = catchAsynErrors(async (req, res, next) => {
    const category = await Category.create(req.body)
    res.status(201).json({ success: true, category })
})

exports.getCategory = catchAsynErrors(async (req, res, next) => {
    const apiFeatures = new APIFeatures(Category.find(), req.query).search().filter().pagination(10)
    const categoryCount = await Category.countDocuments();
    const category = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: category.length,
        categoryCount,
        message: 'This route will show all products',
        category
    })
})

exports.getCategoryByID = catchAsynErrors(async (req, res, next) => {

    const category = await Category.findById(req.params.id);

    if (!category) {
        return next(new ErrorHandler('Product not found', 404))
    } else {
        res.status(200).json({
            success: true,
            category
        })
    }
})



exports.delCategoryByID = catchAsynErrors(async (req, res, next) => {

    const category = await Category.findByIdAndRemove(req.params.id);

    if (!category) {
        return next(new ErrorHandler('Product not found', 404))
    } else {
        res.status(200).json({
            success: true,
        })
    }
})

exports.updateCategorysByID = catchAsynErrors(async (req, res, next) => {

    let category = await Category.findById(req.params.id);

    if (!category) {
        return next(new ErrorHandler('Product not found', 404))
    }
    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        category
    })
})
