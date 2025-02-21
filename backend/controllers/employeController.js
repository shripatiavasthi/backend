const Employee = require("../models/employe");
const ErrorHandler = require('../utils/errorHandler');
const catchAsynErrors = require('../middlewares/catchAsynErrors');

exports.newEmployee = catchAsynErrors(async (req, res, next) => {

    
    if(req.files["resume"][0].location){
    req.body.resume = req.files["resume"][0].location
    }
    
    if(req.files["diploma"][0].location){
    req.body.diploma = req.files["diploma"][0].location
    }

    if(req.files["exp"][0].location){
    req.body.exp = req.files["exp"][0].location
    }
    
    const employee = await Employee.create(req.body)
    res.status(201).json({ success: true, data : employee })
    
})
