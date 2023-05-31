const express = require('express')
const router = express.Router();

const {
    newLead,
    getLeads,
    getLeadByID,
    delLeadByID,
    updateLeadsByID
    } = require('../controllers/leadController')
const { isAuthenticatedUser,authorizeRoles } = require('../middlewares/auth')

router.route('/lead').get(isAuthenticatedUser,authorizeRoles('admin'),getLeads);
router.route('/lead/:id').get(isAuthenticatedUser,authorizeRoles('admin'),getLeadByID);
router.route('/lead/new').post(isAuthenticatedUser,authorizeRoles('admin'),newLead)
router.route('/admin/lead/:id').delete(isAuthenticatedUser,authorizeRoles('admin'),delLeadByID).put(isAuthenticatedUser,authorizeRoles('admin'),updateLeadsByID) //admin

module.exports = router