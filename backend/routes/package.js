const express = require('express')
const router = express.Router();

const {
    newTest,
    getTests,
    getTestByID,
    delTestByID,
    updateTestsByID
    } = require('../controllers/testController')

router.route('/test').get(getTests);
router.route('/test/:id').get(getTestByID);
router.route('/test/new').post(newTest)
router.route('/admin/test/:id').delete(delTestByID).put(updateTestsByID) //admin

module.exports = router