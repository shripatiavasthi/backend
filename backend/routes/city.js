const express = require('express')
const router = express.Router();

const {
    newCity,
    getCity,
    getCityByID,
    delCityByID,
    updateCitysByID
    } = require('../controllers/cityController')

router.route('/city').get(getCity);
router.route('/city/:id').get(getCityByID);
router.route('/admin/city/new').post(newCity) //admin
router.route('/admin/city/:id').delete(delCityByID).put(updateCitysByID) //admin

module.exports = router