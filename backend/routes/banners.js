const express = require('express');
const router = express.Router();
const { updateBanner,getAllBanner} = require('../controllers/bannersController');
const { isAuthenticatedUser,authorizeRoles } = require('../middlewares/auth');
const upload = require('../utils/fileuploadS3');


const bannerUpload = upload('banner');

router.route('/web/banners').get(getAllBanner)
router.route('/web/banners/update').post(bannerUpload.single('file'),updateBanner)
module.exports = router;