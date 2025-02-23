const ErrorHandler = require("../utils/errorHandler");
const catchAsynErrors = require("./catchAsynErrors");
const jwt = require('jsonwebtoken');
const user = require('../models/user')
const client = require('../models/client')



exports.isAuthenticatedUser = catchAsynErrors( async (req, res, next) => {

    const token = req.headers.authorization
    
    if(!token){
        return next(new ErrorHandler('Login first to access this resourse.', 401))
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const clientUser = await client.findById(decoded.id);
    if(!clientUser){
        return next(new ErrorHandler('No user found', 401))
    } else if(clientUser?.disabled){
        return next(new ErrorHandler('Your account has been disabled by admin', 401))
    }else{
        req.user = clientUser
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