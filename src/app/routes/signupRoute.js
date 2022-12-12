const express = require('express')
const router = express.Router()

const signupController = require('./../controllers/signupController')

router.get('/', signupController.signupPage)
router.post('/', signupController.signupHandle)

module.exports = router