const express = require('express')
const router = express.Router()
const { body } = require('express-validator');

const signinController = require('./../controllers/signinController')

router.get("/", signinController.signinPage);
router.post(
    "/", 
    body('signin_username').not().isEmpty().trim().escape(),
    body('signin_password').not().isEmpty().isLength({ min:5 }),
    signinController.handleSignin);

module.exports = router;