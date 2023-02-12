require('dotenv').config()
const path = require('path')

const express = require('express')
const { body } = require('express-validator')

const { regex } = require('./../utils/regex')

const router = express.Router()

const {
    sendAccountPage,
    // uploadProfilePic,
    handleAccountDeletion,
    handleAccountLogOut,
    handleAccountUpdates
} = require('./../controllers/accountController')

router.get('/', sendAccountPage)
router.post(
    '/user/update', 
    body('account_update_fullname').trim().escape().matches(regex.fname),
    body('account_update_username').trim().escape().matches(regex.uname),
    body('account_update_email').isEmail().normalizeEmail().matches(regex.email),
    body('account_update_current_password').trim().escape().matches(regex.pcode),
    body('account_update_new_password').trim().escape(),
    body('account_update_confirm_password').custom((value, { req }) => {
        if (value !== req.body.account_update_new_password) {
            throw new Error('Passwords Dont Match');
        }
        return true;
    }),
    handleAccountUpdates)
// router.post('/user/upload/profile_pic', upload.single('profile_picture'), uploadProfilePic)
router.post('/', handleAccountDeletion)
router.post('/user/logout', handleAccountLogOut)

module.exports = router
