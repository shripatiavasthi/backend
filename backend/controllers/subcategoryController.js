const Subcategory = require('../models/subcategory')

exports.newSubcategory = async (req, res, next) => {
    const subcategory = await Subcategory.create(req.body)
    res.status(201).json({ success: true, subcategory })
}

exports.getSubCategory = async (req, res, next) => {
    const subcategory = await Subcategory.find();
    res.status(200).json({
        success: true,
        count: subcategory.length,
        message: 'This route will show all products',
        category
    })
}

exports.getSubCategoryByID = async (req, res, next) => {

    const subcategory = await Subcategory.findById(req.params.id);

    if (!subcategory) {
        res.status(404).json({
            success: false,
            message: 'No product with this id'
        })
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
        res.status(404).json({
            success: false,
            message: 'No product with this id'
        })
    } else {
        res.status(200).json({
            success: true,
        })
    }
}

exports.updateSubCategorysByID = async (req, res, next) => {

    let subcategory = await Subcategory.findById(req.params.id);

    if (!subcategory) {
        res.status(404).json({
            success: false,
            message: 'No product with this id'
        })
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
