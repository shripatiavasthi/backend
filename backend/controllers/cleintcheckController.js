const clientcheck = require('../models/clientcheck')
const ErrorHandler = require('../utils/errorHandler')
const catchAsynErrors = require('../middlewares/catchAsynErrors')
const APIFeatures = require('../utils/apiFeatures')


exports.newClient = catchAsynErrors(async (req, res, next) => {
    const Clientcheck = await clientcheck.create(req.body)
    res.status(201).json({ success: true, Clientcheck })

})

exports.getClientByID = catchAsynErrors(async (req, res, next) => {

    const Clientcheck = await clientcheck.findById(req.params.id)

    if (!Clientcheck) {
        return next(new ErrorHandler('Product not found', 404))
    } else {
        res.status(200).json({
            success: true,
            Clientcheck
        })
    }
})