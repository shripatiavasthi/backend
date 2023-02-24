const Category = require('../models/category')

exports.newCategory = async (req, res, next) => {
    const category = await Category.create(req.body)
    res.status(201).json({ success: true, category })
}

exports.getCategory = async (req, res, next) => {
    const category = await Category.find();
    res.status(200).json({
        success: true,
        count: category.length,
        message: 'This route will show all products',
        category
    })
}

exports.getCategoryByID = async (req, res, next) => {

    const category = await Category.findById(req.params.id);

    if (!category) {
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

exports.delCategoryByID = async (req, res, next) => {

    const category = await Category.findByIdAndRemove(req.params.id);

    if (!category) {
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

exports.updateCategorysByID = async (req, res, next) => {

    let category = await Category.findById(req.params.id);

    if (!category) {
        res.status(404).json({
            success: false,
            message: 'No product with this id'
        })
    } 
    category = await Category.findByIdAndUpdate(req.params.id,req.body,{
        new : true,
        runValidators : true,
        useFindAndModify: false
    })
    res.status(200).json({
        success :true,
        category
    })
}
