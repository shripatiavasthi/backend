const express = require('express')
const router = express.Router();


const { 
    getProducts , 
    newProduct  , 
    getSingleProduct,
    updateProduct,
    deleteProduct, 
    allBhai,
    otpverify

} = require('../controllers/productController')

router.route('/products').get(getProducts);

router.route('/product/new').post(newProduct);

router.route('/product/allbhai').post(allBhai);

router.route('/product/bhai/otpverify').post(otpverify)

router.route('/product/:id').get(getSingleProduct);

router.route('/admin/product/:id').put(updateProduct).delete(deleteProduct);


module.exports = router;