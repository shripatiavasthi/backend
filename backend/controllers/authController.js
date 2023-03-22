const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler');
const catchAsynErrors = require('../middlewares/catchAsynErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto')

exports.registerUser = catchAsynErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
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

