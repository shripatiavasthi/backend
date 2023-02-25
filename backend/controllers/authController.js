const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler');
const catchAsynErrors = require('../middlewares/catchAsynErrors');

exports.registerUser = catchAsynErrors(async (req,res,next) => {
    const {name,email,password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar : {
            public_id : '',
            url : ''
        }
    })
    res.status(201).json({
        success : true,
        user
    })
})


