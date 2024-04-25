const express = require('express')
const router = express.Router();

const {
    newClient,
    getClientByID
    } = require('../controllers/cleintcheckController')


router.route('/client/:id').get(getClientByID);
router.route('/client/new').post(newClient)


module.exports = router