const express = require('express')
const router = express.Router();
const { upload }  = require('../utils/fileuploadS3');


const Upload = upload("backend-anjani-public","vitalcare/employee");

const {
    newEmployee,
    } = require('../controllers/employeController')

// router.route('/employee').get(getCategory);
router.route('/employee/new').post(Upload.fields([{ name: 'resume' }, { name: 'diploma' },{ name: 'exp' }]),newEmployee) 
// router.route('/employee/:id').get(getCategoryByID);
// router.route('/admin/employee/new').post(newCategory) //admin
// router.route('/admin/employee/:id').delete(delCategoryByID).put(updateCategorysByID) //admin

module.exports = router