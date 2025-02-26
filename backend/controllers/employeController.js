const Employee = require("../models/employe");
const ErrorHandler = require('../utils/errorHandler');
const catchAsynErrors = require('../middlewares/catchAsynErrors');

exports.newEmployee = catchAsynErrors(async (req, res, next) => {
    
    if(req.files["resume"] && req.files["resume"][0].location){
    req.body.resume = req.files["resume"][0].location
    }else{
        return next(new ErrorHandler('Please provide file for resume', 400))
    }
    
    if(req.files["diploma"] && req.files["diploma"][0].location){
    req.body.diploma = req.files["diploma"][0].location
    }
    // else{
    //     return next(new ErrorHandler('Please provide file for diploma', 400))
    // }

    if(req.files["exp"] && req.files["exp"][0].location){
    req.body.exp = req.files["exp"][0].location
    }
    // else{
    //     return next(new ErrorHandler('Please provide file for exp', 400))
    // }
    
    const employee = await Employee.create(req.body)
    res.status(201).json({ success: true, data : employee })
    
})
