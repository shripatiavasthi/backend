const Lead = require('../models/lead')
const ErrorHandler = require('../utils/errorHandler')
const catchAsynErrors = require('../middlewares/catchAsynErrors')
const APIFeatures = require('../utils/apiFeatures')

exports.newLead = catchAsynErrors(async (req, res, next) => {
    const lead = await Lead.create(req.body)
    res.status(201).json({ success: true, lead })
})

exports.getLeads = catchAsynErrors(async (req, res, next) => {
    const apiFeatures = new APIFeatures(Lead.find(), req.query).search().filter().pagination(10)
    const categoryCount = await Lead.countDocuments();
    const lead = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: lead.length,
        categoryCount,
        message: 'This route will show all products',
        lead
    })
})

exports.getLeadByID = catchAsynErrors(async (req, res, next) => {

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
        return next(new ErrorHandler('Product not found', 404))
    } else {
        res.status(200).json({
            success: true,
            lead
        })
    }
})



exports.delLeadByID = catchAsynErrors(async (req, res, next) => {

    const lead = await Lead.findByIdAndRemove(req.params.id);

    if (!lead) {
        return next(new ErrorHandler('Product not found', 404))
    } else {
        res.status(200).json({
            success: true,
        })
    }
})

exports.updateLeadsByID = catchAsynErrors(async (req, res, next) => {

    let lead = await Lead.findById(req.params.id);

    if (!lead) {
        return next(new ErrorHandler('Product not found', 404))
    }
    lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        lead
    })
})
