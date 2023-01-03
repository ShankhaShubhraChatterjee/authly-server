// src/app/routes/signupRoute.js

const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')

const signupController = require('./../controllers/signupController')

router.get('/', signupController.sendSignUpPage)
router.post(
    '/',
    body('signup_fullname').not().isEmpty().trim().escape(),
    body('signup_username').not().isEmpty().trim().escape(),
    body('signup_email').isEmail().normalizeEmail(),
    body('signup_password').isLength({ min: 5 }),
    // (req, res) => {
    //     // Finds the validation errors in this request and wraps them in an object with handy functions
    //     const errors = validationResult(req)
    //     if (!errors.isEmpty()) {
    //         console.log('Error Occured', JSON.stringify(errors.array()))
    //     }
    //     res.redirect("/signup")
    //     res.end();
    // },
    signupController.createUser
)

module.exports = router
