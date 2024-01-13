const ErrorHandler = require('../utils/errorHandler');

module.exports = ( err , req , res , next ) => {
    err.statusCode = res.statusCode || 500;
    err.message = res.message || 'Internal Server Error';

    res.status(err.statusCode).json({
        sucess : true,
        error : err.stack
    })
}