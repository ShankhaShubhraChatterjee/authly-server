require('dotenv').config()
const path = require('path')

const express = require('express')
const { check } = require('express-validator')

const { accountRegex } = require('./../utils/regex')

const router = express.Router()

const {
    sendAccountPage,
    handleProfileImage,
    handleAccountDeletion,
    handleAccountLogOut,
    handleAccountUpdates,
    handleProfilePicDeletion
} = require('./../controllers/accountController')

router.get('/', sendAccountPage)
router.post(
    '/user/update',
    check('account_update_fullname').notEmpty().trim().escape().withMessage("Name Is Not Valid").matches(accountRegex.fname).optional({ checkFalsy:true }),
    check('account_update_username').notEmpty().trim().escape().withMessage("Username Is Not Valid").matches(accountRegex.uname).optional({ checkFalsy:true }),
    check('account_update_email').isEmail().withMessage("Email Is Not Valid").matches(accountRegex.email).optional({ checkFalsy:true }),
    check('account_update_current_password').isLength({ min: 5 }).withMessage("Password Is Not Valid").matches(accountRegex.pcode).optional({ checkFalsy:true }),
    check('account_update_new_password').isLength({ min: 5 }).withMessage("Password Is Not Valid").matches(accountRegex.pcode).optional({ checkFalsy:true }),
    check('account_update_confirm_password').custom((value, { req }) => {
        if (value !== req.body.account_update_new_password) {
            throw new Error('Passwords Dont Match');
        }
        return true;
    }),
    handleAccountUpdates)
router.post('/user/upload/profile_pic', handleProfileImage)
router.post('/user/logout', handleAccountLogOut)
router.post('/user/delete', handleAccountDeletion)
router.post('/user/delete/profile_pic', handleProfilePicDeletion)

module.exports = router