require('dotenv').config()
const path = require('path')

const express = require('express')
const { check } = require('express-validator')

const { accountRegex } = require('./../utils/regex')

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
    check('account_update_fullname').not().isEmpty().trim().escape().withMessage("Name Is Not Valid").matches(accountRegex.fname),
    check('account_update_username').not().isEmpty().trim().escape().withMessage("Username Is Not Valid").matches(accountRegex.uname),
    check('account_update_email').isEmail().withMessage("Email Is Not Valid").matches(accountRegex.email),
    check('account_update_current_password').isLength({ min: 5 }).withMessage("Password Is Not Valid").matches(accountRegex.pcode),
    check('account_update_new_password').isLength({ min: 5 }).withMessage("Password Is Not Valid").matches(accountRegex.pcode),
    check('account_update_confirm_password').custom((value, { req }) => {
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