const Banner = require('../models/banner')
const ErrorHandler = require('../utils/errorHandler')
const catchAsynErrors = require('../middlewares/catchAsynErrors')
const getFile = require('../utils/getUploderFile');



exports.updateBanner = catchAsynErrors(async (req, res, next) => {
    const file = req.file;
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
        res.status(200).json({ success: true, banner })
    }else{
        return next(new ErrorHandler('unable to save image', 404))
    }
})


exports.getAllBanner = catchAsynErrors(async (req, res, next) => {
    const allbannerObject = await Banner.find()
    const bannerArray = await Promise.all(allbannerObject.map(async (banner) => ({
        source: await getFile(banner.filename)
    })));
    if(bannerArray.length > 0){
        res.status(200).json({ success: true, banner : bannerArray })
    }else{
        res.status(404).json({ success: false, message : 'no banner found please upload or check with DB' })
    }
})
