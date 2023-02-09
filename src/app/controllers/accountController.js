require('dotenv').config()
const path = require('path')
const { client } = require('./../utils/db')
const { regex } = require('./../utils/regex')
const { SQL } = require('./../utils/query')
const { errors } = require('./../utils/error')
const bcrypt = require('bcrypt')
const ImageKit = require('imagekit')

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

const sendAccountPage = (req, res) => {
    res.render("pages/account.pug")
}

const handleAccountUpdates = (req, res) => {
    let updates = {
        fname: req.body.account_update_fullname,
        uname: req.body.account_update_username,
        email: req.body.account_update_email,
        currentPassword: req.body.account_update_current_password,
        newPassword: req.body.account_update_new_password,
        confirmPassword: req.body.account_update_confirm_password,
    }
    
}

module.exports = {
    sendAccountPage,
    // uploadProfilePic,
    // handleAccountLogOut,
    handleAccountUpdates
    // handleAccountDeletion,
}
