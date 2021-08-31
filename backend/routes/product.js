const express = require('express')
const router = express.Router();

const {
        getProductsByID,
        getProducts,
        newProduct,
        delProductsByID,
        updateProductsByID
    } = require('../controllers/productController')

router.route('/products').get(getProducts);
router.route('/product/:id').get(getProductsByID);

router.route('/admin/product/new').post(newProduct) //admin
router.route('/admin/product/:id').delete(delProductsByID).put(updateProductsByID) //admin

module.exports = router