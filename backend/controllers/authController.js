const User = require('../models/user')
const MeriBaiUser = require('../models/meriBaiUser')
const ErrorHandler = require('../utils/errorHandler');
const catchAsynErrors = require('../middlewares/catchAsynErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const sendSms = require('../utils/sendSms');




exports.registerUser = catchAsynErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    let vPassword = password
    const user = await User.create({
        name,
        email,
        password,
        vPassword,
        avatar: {
            public_id: '',
            url: ''
        }
    })

    sendToken(user, 200, res)
})

// Login User
exports.loginUser = catchAsynErrors(async (req, res, next) => {

    const { email, password } = req.body
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        return next(new ErrorHandler('Invalid user or password', 400))
    }

    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid user or password', 401))
    }

    sendToken(user, 200, res)

})

// Register MerBai User

// Login bai User

function generateNumericOTP(length) {
    const digits = '0123456789';
    let otp = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * digits.length);
        otp += digits.charAt(randomIndex);
    }

    return otp;
}

exports.loginBaiUser = catchAsynErrors(async (req, res, next) => {

    const { phoneNumber } = req.body
    if (!phoneNumber) {
        return next(new ErrorHandler('Please enter phoneNumber', 400))
    }
    const userBai = await MeriBaiUser.findOne({ phoneNumber })

    if (!userBai) {
        const otp = generateNumericOTP(6);
        // await sendSms({ body: `Welcome to MeriBai, your opt is : ${otp}`, to: phoneNumber })

        const meriBaiUser = await MeriBaiUser.create({
            phoneNumber,
            otp
        })
        res.status(200).json({
            success: true,
            user : meriBaiUser
        })

    } else if (userBai) {
        const otp = generateNumericOTP(6);
        //  await sendSms({ body: `Use opt : ${otp} to Login`, to: phoneNumber })
        userBai.otp = otp
        userBai.save()
        res.status(200).json({
            success: true,
            user : userBai
        })
    } else {
        return next(new ErrorHandler('something went worng', 400));
    }


})

exports.registerBaiUser = catchAsynErrors(async (req, res , next) => {
    const { name , address , phoneNumber , long , lat  } = req.body
    if (!name) {
        return next(new ErrorHandler('Please enter Firstname', 400))
    }else if (!address){
        return next(new ErrorHandler('Please enter Lastname', 400))
    }else if (!phoneNumber){
        return next(new ErrorHandler('Please enter address', 400))
    }

    const userBai = await MeriBaiUser.findOne({ phoneNumber })
    if (!userBai) {
        const meriBaiUser = await MeriBaiUser.create({
            name,
            long,
            lat,
            phoneNumber,
            address
        })
        res.status(200).json({
            success: true,
            user : meriBaiUser
        })
    }else if (userBai) {
        return next(new ErrorHandler('something went worng', 400));
    }
})

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c // in metres
}

exports.getallBai = catchAsynErrors(async (req, res, next) => {
    const allBais = await MeriBaiUser.find()
    const alldata = []
    for ( let i = 0; i < allBais.length; i++ ) {
        const distance = calculateDistance(6.912283 , 79.853239 , allBais[i].lat , allBais[i].long )
        console.log(distance / 1000 , "the distance")
        if(distance < 10){
            alldata.push(allBais[i])
        }
    }
    res.status(200).json({
        success: true,
        alldata
    })
})


exports.verifyOtp = catchAsynErrors(async (req, res, next) => {

    const { phoneNumber, otp } = req.body
    if (!phoneNumber) {
        return next(new ErrorHandler('Please enter phoneNumber', 400))
    }
    if (!otp) {
        return next(new ErrorHandler('Please enter otp', 400))
    }
    const userBai = await MeriBaiUser.findOne({ phoneNumber })

    if (userBai) {
        if (userBai.otp == otp) {
            userBai.verifiedUser = true
            userBai.save()
            sendToken(userBai, 200, res)
        }else{
            return next(new Error('Invalid otp', 400))
        }
    } else if (!userBai) {
        return next(new Error('User with this number does not exist', 400))
    }

})

// Logout user
exports.logout = catchAsynErrors(async (req, res, next) => {
    res.cookie('token', null, { expires: new Date(Date.now()), httpOnly: true })
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    })
})

exports.resetPassword = catchAsynErrors(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler("Password reset token is invalid or has been expired", 400))
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("confirm password and password field does not match", 400))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()
    sendToken(user, 200, res)
})

exports.forgotPassword = catchAsynErrors(async (req, res, next) => {
    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforSave: false })

    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`
    const message = `Your password reset token is as follows:\n\n${resetUrl}\n\n If you have not requested this email, then ignore it.`

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password recovery',
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to : ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforSave: false })

        return next(new ErrorHandler(error.message, 500))
    }
})

exports.getUserProfile = catchAsynErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
})

exports.updatePassword = catchAsynErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password')
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if (!isMatched) {
        return next(new ErrorHandler('old passwrod is incorrect', 400));
    }

    user.password = req.body.password
    await user.save();
    sendToken(user, 200, res)
})

exports.updateProfile = catchAsynErrors(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidator: true,
        userFindAndModify: false
    })

    res.status(200).json({
        success: true
    })

})

exports.allUsers = catchAsynErrors(async (req, res, next) => {
    const user = await User.find()
    res.status(200).json({
        success: true,
        user
    })
})


exports.getUserById = catchAsynErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id)
    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`, 400));
    }
    res.status(200).json({
        success: true,
        user
    })

})