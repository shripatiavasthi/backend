const express = require('express')
const router = express.Router();

const {
    newServices,
    getServices,
    getServicesByID,
    delServicesByID,
    updateServicesByID
    } = require('../controllers/serviceController')
const { isAuthenticatedUser,authorizeRoles } = require('../middlewares/auth')

router.route('/service').get(getServices);
router.route('/service/:id').get(getServicesByID);
router.route('/service/new').post(newServices)
router.route('/admin/service/:id').delete(delServicesByID).put(updateServicesByID) //admin

module.exports = router