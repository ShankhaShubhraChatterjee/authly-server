const express = require('express')
const { check } = require('express-validator')

const router = express.Router()

const {
    sendAccountPage,
    handleProfileImage,
    handleAccountDeletion,
    handleAccountLogOut,
    handleAccountDetails,
    handlePasswordUpdates,
    deleteProfilePicture,
} = require('./../controllers/accountController')

router.get('/', sendAccountPage)
router.post('/user/update/details', handleAccountDetails)
router.post(
    '/user/update/password',
    check('account_update_new_password').custom((value, { req }) => {
        if (value !== req.body.account_update_confirm_password) {
            throw new Error('Passwords Dont Match')
        }
        return true
    }),
    handlePasswordUpdates
)
router.post('/user/logout', handleAccountLogOut)
router.post('/user/delete', handleAccountDeletion)
router.post('/user/upload/profile_pic', handleProfileImage)
router.post('/user/delete/profile_pic', deleteProfilePicture)

module.exports = router
