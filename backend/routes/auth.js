const express = require('express');
const router = express.Router();

const { registerUser,loginUser,loginBaiUser, registerBaiUser,getallBai,logout,forgotPassword,resetPassword,updatePassword,updateProfile,allUsers,getUserById,getUserProfile,verifyOtp} = require('../controllers/authController');
const { isAuthenticatedUser,authorizeRoles,isAuthenticatedBaiUser } = require('../middlewares/auth')

router.route('/status').get(async (req,res,next)=>{
    res.send(200)
})
router.route('/register').post(registerUser);
router.route('/login').post(loginBaiUser);
router.route('/bai/register').post(isAuthenticatedBaiUser,registerBaiUser);
router.route('/allbai').get(getallBai);

router.route('/verifyotp').post(verifyOtp)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/logout').post(logout)
router.route('/me').get(isAuthenticatedUser,getUserProfile)
router.route('/password/update').put(isAuthenticatedUser,updatePassword)
router.route('/me/update').put(isAuthenticatedUser,updateProfile)
router.route('/admin/users').get(isAuthenticatedUser,authorizeRoles('admin'),allUsers)
router.route('/admin/users/:id').get(isAuthenticatedUser,authorizeRoles('admin'),getUserById)
module.exports = router;