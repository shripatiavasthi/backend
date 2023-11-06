const express = require('express')
const router = express.Router()


const { newOrders, myorders, getSingleOrder, allOrders } = require('../controllers/orderController')
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth')

router.route('order/new').post(isAuthenticatedUser, newOrders);
router.route('order/:id').post(isAuthenticatedUser, getSingleOrder);
router.route('order/me').post(isAuthenticatedUser, myorders);
router.route('admin/orders').post(isAuthenticatedUser,authorizeRoles('admin'), allOrders);


module.exports = router
