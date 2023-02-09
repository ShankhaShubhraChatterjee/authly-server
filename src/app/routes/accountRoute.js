require('dotenv').config()
const path = require('path')

const express = require('express')
const multer = require('multer')
const { body } = require('express-validator')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../client/assets/img/uploads/"))
      },
      filename: (req, file, cb) => {
        cb(null, 'profile-image' + path.extname(file.originalname))
      }
})

const router = express.Router()
const upload = multer({ storage: storage })

const {
    sendAccountPage,
    // uploadProfilePic,
    // handleAccountDeletion,
    // handleAccountLogOut,
    handleAccountUpdates
} = require('./../controllers/accountController')

router.get('/', sendAccountPage)
router.post(
    '/user/update', 
    body('account_update_fullname'),
    body('account_update_username'),
    body('account_update_email'),
    body('account_update_current_password'),
    body('account_update_new_password'),
    body('account_update__confirm_password'),
    handleAccountUpdates)
// router.post('/user/upload/profile_pic', upload.single('profile_picture'), uploadProfilePic)
// router.post('/', handleAccountDeletion)
// router.post('/user/logout', handleAccountLogOut)

module.exports = router
