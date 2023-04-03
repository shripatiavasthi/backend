const ErrorHandler = require('../utils/errorHandler');

module.exports = (err,req,res,next) => {

    err.statusCode = err.statusCode || 500;

    if(process.env.NODE_ENV === 'DEVELOPMENT'){
        res.status(err.statusCode).json({
            success:false,
            error:err,
            errMessage : err.message,
            stack : err.stack
        })
    }

    if(process.env.NODE_ENV === 'PRODUCTION'){
        let error = { ...err}
        error.message = err.message

        // worng Mongoose object id
        if(err.name == 'CastError'){
            const message = `Resource not found. Invalid : ${err.path}`
            error = new ErrorHandler(message,400)
        }

        // Handling moongoose validation error
        if(err.name == 'ValidationError'){
            const message = Object.values(err.errors).map(value => value.message)
            error = new ErrorHandler(message,400)
        }
        // Duplicate key
        if(err.name === 11000 ){
            const message = `Duplicate ${Object.keys(err.keyValue)} entered`
            error = new ErrorHandler(message,400)
        }
        // Handling wrong JWT error
        if(err.name === 'JsonwebTokenError' ){
            const message = `JSON web token is invalid. Try Again`
            error = new ErrorHandler(message,400)
        }

        if(err.name === 'tokenExpiredError'){
            const message = `JSON web token is Expired. Try Again`
            error = new ErrorHandler(message,400)
        }

        res.status(error.statusCode).json({
            success : true,
            message : error.message || 'Internal Server Error',
        })

    }

    

}