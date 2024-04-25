const mongoose = require('mongoose');

const clientcheck = new mongoose.Schema({
   clientName : {
    required: [true,"please provide a client name"],
    type: 'string',
   },
   allowwebSite : {
    type: 'boolean',
    default: false
   },
   allowMobile : {
    type : 'boolean',
    default: false
   }
})

module.exports = mongoose.model('clientcheck', clientcheck);
