require('dotenv').config()
const fs = require('fs')
const { client } = require('./../utils/db')
const { SQL } = require('./../utils/query')
const { clientErrors } = require('./../utils/error')
const { errorFormat } = require('./../configs/errorConfig')
const { validationResult } = require('express-validator')
const ImageKit = require('imagekit')
const { inputFieldEmpty, updateAccountDetails } = require('../utils/validate')

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

// Send Account Template To Client
const sendAccountPage = (req, res) => {
    if (req.session.auth) {
        console.log(req.session.user)
        res.render("pages/account.pug", { error: clientErrors.accountErrors, user: req.session.user })
        res.end()
    }
    else {
        res.redirect("/forbidden");
        res.end()
    }
}

// Handles All Updates In Account Page
const handleAccountUpdates = async (req, res) => {
    let updates = {
        fname: req.body.account_update_fullname,
        uname: req.body.account_update_username,
        email: req.body.account_update_email,
        currentPassword: req.body.account_update_current_password,
        newPassword: req.body.account_update_new_password,
        confirmPassword: req.body.account_update_confirm_password,
    }
    let checkValues = {
        fname: inputFieldEmpty(updates.fname),
        uname: inputFieldEmpty(updates.uname),
        email: inputFieldEmpty(updates.email),
        currentPassword: inputFieldEmpty(updates.currentPassword),
        newPassword: inputFieldEmpty(updates.newPassword),
        confirmPassword: inputFieldEmpty(updates.confirmPassword)
    }
    let errors = validationResult(req).formatWith(errorFormat)
    if (checkValues) {
        console.log("Executed If")
        if (!checkValues.fname) {
            console.log("Working")
            console.log(checkValues.fname)
            await client
                .query(SQL.updateFullname, [updates.fname, updates.uname])
                .then(() => console.log("name updated"))
                .catch((err) => { console.error(err); return false })
            // await updateAccountDetails(SQL.updateFullname, [updates.fname, updates.uname])
        }
        if (!checkValues.uname) {
            console.log(checkValues.uname)
            await updateAccountDetails(SQL.updateUsername, [updates.uname, updates.uname])
        }
        if (!checkValues.email) {
            console.log(checkValues.email)
            await updateAccountDetails(SQL.updateEmail, [updates.email, updates.uname])
        }
        res.redirect('/account')
        res.end()
    }
    else {
        console.log("EXecuted Else")
        try { 
            clientErrors.accountErrors = errors.mapped()
        }
        catch (err) { console.error("No Error Occured") }
        res.redirect("/account")
        res.end()
    }
}
// Handle Profile Image Upload

const handleProfileImage = async (req, res) => {
    let image = req.files.profile_picture;
    let user = req.session.user.uname;
    console.log(image)
    imageKit.upload({
        file: image.data,
        fileName: image.name
    }, async (err, result) => {
        if (err) console.error(err)
        else { 
            await client
                .query(SQL.addProfileImage, [result.url, user])
                .then(() => {
                    console.log("Profile Image Added")
                    req.session.user.profile = result.url; 
                })
                .catch((err) => console.error(err))
        }
    })
    setTimeout(() => {
        res.redirect("/account")
        res.end()
    }, 2500)
    
}

// Handles User Account LogOut
const handleAccountLogOut = async (req, res) => {
    req.session.destroy(() => {
        res.redirect("/")
        res.end()
    })
}
const handleAccountDeletion = async (req, res) => {
    await client
        .query(SQL.deleteByUsername, [req.session.user.uname])
        .then(() => {
            req.session.destroy(() => {
                res.redirect("/")
                res.end()
            })
            
        })
        .catch((err) => console.error(err))
}

module.exports = {
    sendAccountPage,
    handleProfileImage,
    handleAccountLogOut,
    handleAccountUpdates,
    handleAccountDeletion,
}
