const express = require('express')
const router = express.Router();

const {
    newLead,
    getLeads,
    getLeadByID,
    delLeadByID,
    updateLeadsByID
    } = require('../controllers/leadController')

router.route('/category').get(getLeads);
router.route('/category/:id').get(getLeadByID);
router.route('/admin/category/new').post(newLead) //admin
router.route('/admin/category/:id').delete(delLeadByID).put(updateLeadsByID) //admin

module.exports = router