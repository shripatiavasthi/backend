const express = require('express')
const router = express.Router();

const {
    newSubcategory,
    getSubCategory,
    getSubCategoryByID,
    delSubCategoryByID,
    updateSubCategorysByID
    } = require('../controllers/subcategoryController')

router.route('/subcategory').get(getSubCategory);
router.route('/subcategory/:id').get(getSubCategoryByID);
router.route('/admin/subcategory/new').post(newSubcategory) //admin
router.route('/admin/subcategory/:id').delete(delSubCategoryByID).put(updateSubCategorysByID) //admin

module.exports = router