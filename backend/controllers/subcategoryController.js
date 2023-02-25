const Subcategory = require('../models/subcategory')

exports.newSubcategory = async (req, res, next) => {
    const subcategory = await Subcategory.create(req.body)
    res.status(201).json({ success: true, subcategory })
}

exports.getSubCategory = async (req, res, next) => {
    const apiFeatures = new APIFeatures(Subcategory.find(), req.query).search().filter().pagination(2)
    const subcategoryCount = await Category.countDocuments();
    const subcategory = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: subcategory.length,
        subcategoryCount,
        message: 'This route will show all products',
        subcategory
    })
}

exports.getSubCategoryByID = async (req, res, next) => {

    const subcategory = await Subcategory.findById(req.params.id);

    if (!subcategory) {
        return next(new ErrorHandler('Product not found', 404))
    } else {
        res.status(200).json({
            success: true,
            category
        })
    }
}

exports.delSubCategoryByID = async (req, res, next) => {

    const subcategory = await Subcategory.findByIdAndRemove(req.params.id);

    if (!subcategory) {
        return next(new ErrorHandler('Product not found', 404))
    } else {
        res.status(200).json({
            success: true,
        })
    }
}

exports.updateSubCategorysByID = async (req, res, next) => {

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
}