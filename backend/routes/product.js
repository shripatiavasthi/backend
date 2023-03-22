const express = require('express')
const router = express.Router();

const {
        getProductsByID,
        getProducts,
        newProduct,
        delProductsByID,
        updateProductsByID
    } = require('../controllers/productController')

const { isAuthenticatedUser,authorizeRoles } = require('../middlewares/auth')

router.route('/products').get(getProducts);
router.route('/product/:id').get(getProductsByID);
router.route('/admin/product/new').post(isAuthenticatedUser,authorizeRoles('admin'),newProduct) //admin
router.route('/admin/product/:id').delete(delProductsByID).put(updateProductsByID) //admin

module.exports = router