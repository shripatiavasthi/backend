const LeadStatus = require('../models/leadStatus')
const ErrorHandler = require('../utils/errorHandler')
const catchAsynErrors = require('../middlewares/catchAsynErrors')
const APIFeatures = require('../utils/apiFeatures')

exports.newLeadStatus = catchAsynErrors(async (req, res, next) => {
    const leadStatus = await LeadStatus.create(req.body)
    res.status(201).json({ success: true, leadStatus })
})

exports.getLeadsStatus = catchAsynErrors(async (req, res, next) => {
    const apiFeatures = new APIFeatures(LeadStatus.find(), req.query).search().filter().pagination(10)
    const categoryCount = await LeadStatus.countDocuments();
    const leadStatus = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: leadStatus.length,
        categoryCount,
        message: 'This route will show all products',
        leadStatus
    })
})

exports.getLeadStatusByID = catchAsynErrors(async (req, res, next) => {

    const leadStatus = await LeadStatus.findById(req.params.id);

    if (!leadStatus) {
        return next(new ErrorHandler('Product not found', 404))
    } else {
        res.status(200).json({
            success: true,
            leadStatus
        })
    }
})



exports.delLeadStatusByID = catchAsynErrors(async (req, res, next) => {

    const leadStatus = await LeadStatus.findByIdAndRemove(req.params.id);

    if (!leadStatus) {
        return next(new ErrorHandler('Product not found', 404))
    } else {
        res.status(200).json({
            success: true,
        })
    }
})

exports.updateLeadsStatusByID = catchAsynErrors(async (req, res, next) => {

    let leadStatus = await LeadStatus.findById(req.params.id);

    if (!leadStatus) {
        return next(new ErrorHandler('Product not found', 404))
    }
    leadStatus = await LeadStatus.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        leadStatus
    })
})
