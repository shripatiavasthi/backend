const express = require('express')
const router = express.Router();

const {
    newCategory,
    getCategory,
    getCategoryByID,
    delCategoryByID,
    updateCategorysByID
    } = require('../controllers/categoryController')

router.route('/category').get(getCategory);
router.route('/category/:id').get(getCategoryByID);
router.route('/admin/category/new').post(newCategory) //admin
router.route('/admin/category/:id').delete(delCategoryByID).put(updateCategorysByID) //admin

module.exports = router