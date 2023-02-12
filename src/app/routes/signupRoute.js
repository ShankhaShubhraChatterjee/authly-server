// src/app/routes/signupRoute.js

const express = require('express')
const router = express.Router()
const { regex } = require('./../utils/regex')
const { body } = require('express-validator')

const { sendSignUpPage, createUser, test } = require('./../controllers/signupController')

router.get('/', sendSignUpPage)
router.post(
    '/',
    body('signup_fullname').not().isEmpty().matches(regex.fname),
    body('signup_username').not().isEmpty().matches(regex.uname),
    body('signup_email').isEmail().normalizeEmail().matches(regex.email),
    body('signup_password').isLength({ min: 5 }).matches(regex.pcode),
    createUser
)

module.exports = router
