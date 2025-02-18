const Banner = require('../models/fileupload')
const ErrorHandler = require('../utils/errorHandler')
const catchAsynErrors = require('../middlewares/catchAsynErrors')


exports.updateBanner = catchAsynErrors(async (req, res, next) => {
    const file = req.file;
    console.log(file)
    const { originalname, mimetype, size, key,location } = file;
    const uniqueID = key.split('.')[0];
    const banner = await Banner.create({
        uuid: uniqueID,
        name: originalname,
        mimeType: mimetype,
        size: size,
        url: location,
        filename : key
    })
    if(banner){
        res.status(200).json({ success: true, file })
    }else{
        return next(new ErrorHandler('unable to save image', 400))
    }
})