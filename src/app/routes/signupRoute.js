const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator');


const signupController = require('./../controllers/signupController')

router.get('/', signupController.signupPage)
router.post(
    '/', 
    // body('signup_fullname').not().isEmpty().trim().escape(),
    // body('signup_email').isEmail().normalizeEmail(), 
    signupController.signupHandle)

module.exports = router