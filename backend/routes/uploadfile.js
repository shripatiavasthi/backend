const express = require('express');
const router = express.Router();
const { updateBanner} = require('../controllers/uploadController');
const { authorizeRoles } = require('../middlewares/auth');
const { upload }  = require('../utils/fileuploadS3');


const bannerUpload = upload("backend-anjani-public","vitalcare");

router.route('/web/upload').post(bannerUpload.single('file'),updateBanner)

module.exports = router;