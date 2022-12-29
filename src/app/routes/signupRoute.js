const express = require('express')
const router = express.Router()
const { body } = require('express-validator');


const signupController = require('./../controllers/signupController')

router.get('/', signupController.sendSignUpPage)
router.post(
    '/', 
    body('signup_fullname').not().isEmpty().trim().escape(),
    body('signup_username').not().isEmpty().trim().escape(),
    body('signup_email').not().isEmpty().isEmail().normalizeEmail(),
    body('signup_password').isLength({ min: 5 }),
    signupController.handleSignup)

module.exports = router