const express = require('express')
const router = express.Router();

const {
    newLeadStatus,
    getLeadsStatus,
    getLeadStatusByID,
    delLeadStatusByID,
    updateLeadsStatusByID
    } = require('../controllers/leadStatusController')

router.route('/category').get(getLeadsStatus);
router.route('/category/:id').get(getLeadStatusByID);
router.route('/admin/category/new').post(newLeadStatus) //admin
router.route('/admin/category/:id').delete(delLeadStatusByID).put(updateLeadsStatusByID) //admin

module.exports = router