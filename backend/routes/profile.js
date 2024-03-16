const express = require('express');
const router = express.Router();
const {
    getProfile
} = require('../controllers/profileController')
const { isAuthenticatedBaiUser, authorizeRoles } = require('../middlewares/auth');


router.route('/profile/').get(isAuthenticatedBaiUser,getProfile )

module.exports = router;