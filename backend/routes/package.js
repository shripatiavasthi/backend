const express = require('express')
const router = express.Router();

const {
    newPackage,
    getPackages,
    getPackageByID,
    delPackageByID,
    updatePackagesByID
    } = require('../controllers/packageController')

router.route('/package').get(getPackages);
router.route('/package/:id').get(getPackageByID);
router.route('/package/new').post(newPackage)
router.route('/admin/package/:id').delete(delPackageByID).put(updatePackagesByID) //admin

module.exports = router