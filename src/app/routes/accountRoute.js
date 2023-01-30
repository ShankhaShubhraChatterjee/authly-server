require('dotenv').config()
const path = require('path')
const express = require('express')
const router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../client/assets/img/uploads/"))
      },
      filename: (req, file, cb) => {
        cb(null, 'profile-image' + path.extname(file.originalname))
      }
})
const upload = multer({storage: storage})

const {
    sendAccountPage,
    uploadProfilePic,
    handleAccountDeletion,
    handleAccountLogOut,
    handleAccountUpdates,
} = require('./../controllers/accountController')

router.get('/', sendAccountPage)
router.post('/user/update', handleAccountUpdates)
router.post('/user/upload/profile_pic', upload.single('profile_picture'), uploadProfilePic)
router.post('/', handleAccountDeletion)
router.post('/user/logout', handleAccountLogOut)

module.exports = router
