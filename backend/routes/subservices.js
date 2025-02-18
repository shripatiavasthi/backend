const express = require('express')
const router = express.Router();

const {
    newSubservices,
    getSubservices,
    getSubservicesByID,
    delSubservicesByID,
    updateSubservicesByID,
    getServiceSubserviceByID,
    } = require('../controllers/subServiceController')
const { isAuthenticatedUser,authorizeRoles } = require('../middlewares/auth')

router.route('/subservices').get(getSubservices);
router.route('/subservices/:id').get(getSubservicesByID);
router.route('/subservices/new').post(newSubservices)
router.route('/services/subservices/:id').get(getServiceSubserviceByID)
router.route('/admin/subservices/:id').delete(delSubservicesByID).put(updateSubservicesByID) //admin

module.exports = router