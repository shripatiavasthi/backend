const express = require('express')
const router = express.Router();

const {
    newTestparameter,
    getTestparameters,
    getTestparameterByID,
    delTestparameterByID,
    updateTestparametersByID
    } = require('../controllers/testParameterController')

router.route('/testparameter').get(getTestparameters);
router.route('/testparameter/:id').get(getTestparameterByID);
router.route('/testparameter/new').post(newTestparameter)
router.route('/admin/testparameter/:id').delete(delTestparameterByID).put(updateTestparametersByID) //admin

module.exports = router