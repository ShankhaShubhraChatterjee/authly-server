const express = require('express')
const router = express.Router()
const { regex } = require('./../utils/regex')
const { body } = require('express-validator')

const {
    handleSignin,
    sendSigninPage,
} = require('./../controllers/signinController')

router.get('/', sendSigninPage)
router.post(
    '/',
    body('signin_username')
        .not()
        .isEmpty()
        .trim()
        .escape()
        .matches(regex.uname),
    body('signin_password')
        .not()
        .isEmpty()
        .isLength({ min: 5 })
        .matches(regex.pcode),
    handleSignin
)

module.exports = router
