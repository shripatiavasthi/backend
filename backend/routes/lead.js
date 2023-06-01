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

router.route('/lead').get(getLeads);
router.route('/lead/:id').get(getLeadByID);
router.route('/lead/new').post(newLead)
router.route('/admin/lead/:id').delete(delLeadByID).put(updateLeadsByID) //admin

module.exports = router