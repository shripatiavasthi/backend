const express = require('express')
const router = express.Router();

const {
    newLeadStatus,
    getLeadsStatus,
    getLeadStatusByID,
    delLeadStatusByID,
    updateLeadsStatusByID
    } = require('../controllers/leadStatusController')

router.route('/leadstatus').get(getLeadsStatus);
router.route('/leadstatus/:id').get(getLeadStatusByID);
router.route('/admin/leadstatus/new').post(newLeadStatus) //admin
router.route('/admin/leadstatus/:id').delete(delLeadStatusByID).put(updateLeadsStatusByID) //admin

module.exports = router