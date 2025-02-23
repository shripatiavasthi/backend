const express = require('express')
const router = express.Router();
const { upload }  = require('../utils/fileuploadS3');


const Upload = upload("backend-anjani-public","vitalcare/customers");

const {
    newCustomer,
    } = require('../controllers/customerController');
const { isAuthenticatedUser } = require('../middlewares/auth');

// router.route('/employee').get(getCategory);
router.route('/customer/update').post(isAuthenticatedUser,Upload.fields([{ name: 'prescription' }]),newCustomer) 
// router.route('/employee/:id').get(getCategoryByID);
// router.route('/admin/employee/new').post(newCategory) //admin
// router.route('/admin/employee/:id').delete(delCategoryByID).put(updateCategorysByID) //admin

module.exports = router