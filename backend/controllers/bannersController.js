const Banner = require('../models/banner')
const ErrorHandler = require('../utils/errorHandler')
const catchAsynErrors = require('../middlewares/catchAsynErrors')
const upload = require('../utils/fileuploadS3');
const APIFeatures = require('../utils/apiFeatures')


exports.getBanner = catchAsynErrors(async (req, res, next) => {
   
})

exports.updateBanner = catchAsynErrors(async (req, res, next) => {
    // console.log(process.env)
    res.send(200)
})

