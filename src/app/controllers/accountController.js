require('dotenv').config()
const path = require('path')
const { client } = require('./../utils/db')
const { regex } = require('./../utils/regex')
const { SQL } = require('./../utils/query')
const { clientErrors } = require('./../utils/error')
const { errorFormat } = require('./../configs/errorConfig')
const bcrypt = require('bcrypt')
const { validationResult} = require('express-validator')
const ImageKit = require('imagekit')

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})
// Send Account Template To Client
const sendAccountPage = (req, res) => {
    // if(req.session.auth){
        res.render("pages/account.pug", { error:clientErrors.accountErrors, user: req.session.user })
        res.end()
    // }
    // else {
        // res.redirect("/forbidden");
        // res.end()
    // }
}

// Handles All Updates In Account Page
const handleAccountUpdates = (req, res) => {
    let updates = {
        fname: req.body.account_update_fullname,
        uname: req.body.account_update_username,
        email: req.body.account_update_email,
        currentPassword: req.body.account_update_current_password,
        newPassword: req.body.account_update_new_password,
        confirmPassword: req.body.account_update_confirm_password,
    }
    let errors = validationResult(req).formatWith(errorFormat)
    if(!errors.isEmpty()){
        try { 
            clientErrors.accountErrors = errors.mapped()
        }
        catch (err) { console.error("No Error Occured") }
        res.redirect("/account")
        res.end()
    }
    else {
        
    }

}
// Handles User Account LogOut
const handleAccountLogOut = async (req, res) => {
    await req.session.destroy()
    req.session.notifyLogOut = true;
    res.redirect("/")
    res.end()
}
const handleAccountDeletion = async (req, res) => {
    client.query('DELETE FROM users WHERE uname=$1', [req.session.user.uname])
    .then(() => {
        req.session.destroy()
        req.session.notifyDeletion = true;
        res.redirect("/")
        res.end()
    })
}

module.exports = {
    sendAccountPage,
    // uploadProfilePic,
    handleAccountLogOut,
    handleAccountUpdates,
    handleAccountDeletion,
}
