require('dotenv').config()
const express = require('express')
const router = express.Router()

const accountController = require('./../controllers/accountController');

router.get('/', accountController.accountPage);

module.exports = router
