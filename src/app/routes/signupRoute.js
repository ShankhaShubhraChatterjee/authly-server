// src/app/routes/signupRoute.js

const express = require('express')
const router = express.Router()
const { regex } = require('./../utils/regex')
const { check } = require('express-validator')

const {
    sendSignUpPage,
    createUser,
} = require('./../controllers/signupController')

router.get('/', sendSignUpPage)

router.post(
    '/',
    check('signup_fullname')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .withMessage('Name Invalid')
        .matches(regex.fname),
    check('signup_username')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .withMessage('Username Error')
        .matches(regex.uname),
    check('signup_email')
        .isEmail()
        .withMessage('Email Is Incorrect')
        .matches(regex.email),
    check('signup_password')
        .not()
        .isEmpty()
        .withMessage('Password Not Valid')
        .isLength({ min: 5 })
        .matches(regex.pcode),
    createUser
)

module.exports = router
