const express = require('express')
const router = express.Router();

const {
    newCity,
    getCity,
    getCityByID,
    delCityByID,
    updateCitysByID
    } = require('../controllers/cityController')

router.route('/category').get(getCity);
router.route('/category/:id').get(getCityByID);
router.route('/admin/category/new').post(newCity) //admin
router.route('/admin/category/:id').delete(delCityByID).put(updateCitysByID) //admin

module.exports = router