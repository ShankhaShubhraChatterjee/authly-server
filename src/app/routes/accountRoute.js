require('dotenv').config()
const express = require('express')
const router = express.Router()

const {
    sendAccountPage,
    handleAccountDeletion,
    handleAccountLogOut,
    handleAccountUpdates
} = require('./../controllers/accountController')

router.get('/', sendAccountPage)
router.post('/user/update', handleAccountUpdates)
router.post('/user/delete-account', handleAccountDeletion)
router.post('/user/logout', handleAccountLogOut)

module.exports = router
