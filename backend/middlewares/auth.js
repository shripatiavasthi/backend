const ErrorHandler = require("../utils/errorHandler");
const catchAsynErrors = require("./catchAsynErrors");
const jwt = require('jsonwebtoken');
const user = require('../models/user')
const MeriBaiUser = require('../models/meriBaiUser');

exports.isAuthenticatedUser = catchAsynErrors( async (req, res, next) => {
    const {token} = req.cookies
    if(!token){
        return next(new ErrorHandler('Login first to access this resourse.', 401))
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await user.findById(decoded.id); 
    next()
})


exports.isAuthenticatedBaiUser = catchAsynErrors( async (req, res, next) => {

    const {token} = req.cookies ? req.cookies : req.headers.authorization
    
    if(!token){
        return next(new ErrorHandler('Login first to access this resourse.', 401))
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const gotMeriBaiUser = await MeriBaiUser.findById(decoded.id);

    if(!gotMeriBaiUser){
        return next(new ErrorHandler('No user found', 401))
    } else if(gotMeriBaiUser?.disabled){
        return next(new ErrorHandler('Your account has been disabled by admin', 401))
    }else{
        req.user = gotMeriBaiUser
    }
    next()
})


exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role ${req.user.role} not allowed to authorize for this request`,403))  
        }
        next()
    }
}