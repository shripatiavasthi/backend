
const ErrorHandler = require('../utils/errorHandler')
const catchAsynErrors = require('../middlewares/catchAsynErrors')



exports.getProfile = catchAsynErrors(async (req, res, next) => {
    const profile = req.user

    if (profile) {
        res.status(200).json({
            success: true,
            data: profile
        })
    } else {
       new ErrorHandler('No profile found',400)
    }
})


