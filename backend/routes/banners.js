const express = require('express');
const router = express.Router();
const { updateBanner,getBanner} = require('../controllers/bannersController');
const { isAuthenticatedUser,authorizeRoles } = require('../middlewares/auth');
const upload = require('../utils/fileuploadS3');


router.route('/web/banners').get(getBanner)
// router.route('/web/all/banners').put(isAuthenticatedUser,authorizeRoles('admin'),getUserProfile)
router.route('/web/banners/update').post(upload.single('file'),updateBanner)
module.exports = router;