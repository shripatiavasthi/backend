const Customer = require("../models/client");
const ErrorHandler = require('../utils/errorHandler');
const catchAsynErrors = require('../middlewares/catchAsynErrors');

exports.newCustomer = catchAsynErrors(async (req, res, next) => {
    
    if(req.files["prescription"] && req.files["prescription"][0].location){
        req.body.prescription = req.files["prescription"][0].location
    }

    const updateCustomer = await Customer.findByIdAndUpdate(req.user._id,req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false
     })
    
    res.status(201).json({ success: true, data : updateCustomer })
    
})
