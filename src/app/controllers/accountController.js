require('dotenv').config()
const { client } = require('./../utils/db')
const { SQL } = require('./../utils/query')
const { clientErrors } = require('./../utils/error')
const { imageKit } = require('./../utils/imagekit')
const { userExistsInDb, emailInUse, matchCurrentPassword, inputFieldEmpty } = require('../utils/validate')
const { regex } = require('../utils/regex')
const { hashPassword } = require('../utils/hash')
const { fetchProfileImageData } = require('../utils/fetch')
// Send Account Template To Client
const sendAccountPage = async (req, res) => {
    if (req.session.auth) {
        res.render(
            "pages/account.pug", 
            { 
                errors: clientErrors.accountErrors, 
                user: req.session.user, 
                auth: req.session.auth 
            }
        )

        Object.keys(clientErrors.accountErrors).forEach(index => clientErrors.accountErrors[index] = null)
        res.end()
    }
    else {
        res.redirect("/forbidden");
        res.end()
    }
}

// Handles All Updates In Account Page
const handleAccountDetails = async (req, res) => {
    let updates = {
        fname: req.body.account_update_fullname,
        uname: req.body.account_update_username,
        email: req.body.account_update_email
    }
    let regexValues = {
        fname: regex.fname.test(updates.fname),
        uname: regex.uname.test(updates.uname),
        email: regex.email.test(updates.email)
    }

    let userExists = await userExistsInDb(updates.uname);
    let emailTaken = await emailInUse(updates.email);
    
    if (!inputFieldEmpty(updates.fname)) {
        if (regexValues.fname) {
            await client
                .query(SQL.updateFullname, [updates.fname, req.session.user.uname])
                .then(() => {
                    req.session.user.fname = updates.fname
                })
                .catch((err) => console.error(err))
        }
        else {
            if (!regexValues.fname) clientErrors.accountErrors.accountFnameError = "Name Invalid"
        }
    }
    if (!inputFieldEmpty(updates.uname)) {
        if (regexValues.uname && !userExists) {
            await client
                .query(SQL.updateUsername, [updates.uname, req.session.user.uname])
                .then(() => {
                    req.session.user.uname = updates.uname
                })
                .catch((err) => console.error(err))
        }
        else {
            if (!regexValues.uname) clientErrors.accountErrors.accountUnameError = "Username Invalid"

            if (userExists) clientErrors.accountErrors.accountUserExists = "User Exists"
        }
    }
    if (!inputFieldEmpty(updates.email)) {
        if (regexValues.email && !emailTaken) {
            await client
                .query(SQL.updateEmail, [updates.email, req.session.user.uname])
                .then(() => {
                    req.session.user.email = updates.email
                })
                .catch((err) => console.error(err))
        }
        else {
            if (!regexValues.email) clientErrors.accountErrors.accountEmailError = "Email Invalid"

            if (emailTaken) clientErrors.accountErrors.accountEmailUsed = "Email In Use"
        }
    }
    res.redirect('/account')
    res.end()
}
// Handle Password Updates
const handlePasswordUpdates = async (req, res) => {
    let username = req.session.user.uname;
    let updates = {
        currentPassword: req.body.account_update_current_password,
        newPassword: req.body.account_update_new_password,
        confirmPassword: req.body.account_update_confirm_password
    }

    let regexValues = {
        oldPassword: regex.pcode.test(updates.currentPassword),
        newPassword: regex.pcode.test(updates.newPassword),
        confirmPassword: regex.pcode.test(updates.confirmPassword)
    }
    if (regexValues.oldPassword && regexValues.newPassword && regexValues.confirmPassword) {
        let check = await matchCurrentPassword(updates.currentPassword, [username])
        let hash = await hashPassword(updates.newPassword, 10)
        if (updates.newPassword === updates.confirmPassword && check) {
            client.query(SQL.updateUserPassword, [hash, username], (err, data) => {
                if (err) console.error(err)
                else {
                    req.session.destroy()
                }
            })
            req.session.passwordChanged = true;
        }
        if (!check) {
            clientErrors.accountErrors.wrongPassword = "Wrong Password"
        }
        if (updates.newPassword !== updates.confirmPassword) {
            clientErrors.accountErrors.passwordMatch = "Passwords Doesnt Match"
        }
    }
    else {
        !regexValues.oldPassword ? clientErrors.accountErrors.accountCurrentPasswordError = "Old Password Invalid" : ""
        !regexValues.newPassword ? clientErrors.accountErrors.accountNewPasswordError = "New Password Invalid" : ""
        !regexValues.confirmPassword ? clientErrors.accountErrors.accountConfirmPasswordError = "Confirm Password Invalid" : ""
    }
    if (req.session.passwordChanged) {
        res.redirect("/signin")
        res.end()
    }
    else {
        passwordChanged = false;
        res.redirect("/account")
        res.end()
    }
}
// Handles Profile Image Upload
const handleProfileImage = async (req, res) => {
    let image = req.files;
    let user = req.session.user.uname;
    let profileImage = await fetchProfileImageData(user)
    if (req.files === null) {
        clientErrors.accountErrors.accountImageUploadError = "Please Select An Image"
        res.redirect("/account")
        res.end()
    }
    else {
        if(profileImage.profile_image_id) {
            imageKit.deleteFile(profileImage.profile_image_id, (err, result) => {
                if(err) console.error(err)
                else {
                    console.log("Success")
                    client.query(SQL.modifyProfileImage, [null, null, user])
                }
            })
        }
        imageKit
            .upload({
                file: image.profile_picture.data,
                fileName: image.profile_picture.name,
                folder: "Authly/Profile_Images"
            })
            .then((result) => {
                client.query(SQL.modifyProfileImage, [result.url, result.fileId, user])
                return result
            })
            .then((result) => {
                // let profileImage = fetchProfileImageData(req.session.user.uname);
                req.session.user.profile_image = result.url;
                req.session.user.profile_image_id = result.fileId;
                console.log(req.session)
                return req.session.user;
            })
            .then(() => {
                res.redirect("/account")
                res.end()
            })
            .catch((err) => console.error(err))
                
    }
}
// Handles Profile Picture Deletion
const deleteProfilePicture = async (req, res) => {
    console.log("Executing Delete pRofile Too")
    let user = req.session.user.uname;
    if (req.session.user.profile_image !== null) {
        imageKit.deleteFile(
            `${req.session.user.profile_image_id}`, 
            async (err, _) => {
                if (err) console.error(err)
                else {
                    await client
                        .query(SQL.modifyProfileImage, [null, null, user])
                        .then(() => {
                            req.session.user.profile_image = null
                            req.session.user.profile_image_id = null
                        })
                        .catch((err) => console.error(err))
                }
            })
        
        setTimeout(() => {
            res.redirect("/account")
            res.end()
        }, 2500)
    }
    else {
        res.json({ error: "Image Doesnt Exist" })
    }
    
}
// Handles User Account LogOut
const handleAccountLogOut = async (req, res) => {
    req.session.destroy(() => {
        res.redirect("/")
        res.end()
    })
}

// Handles Entire Account Deletion
const handleAccountDeletion = async (req, res) => {
    imageKit.deleteFile(`${req.session.user.profile_image_id}`, 
        (err, result) => {
            if (err) console.error(err)
            else {
                console.log(result)
            }
        })
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
    handleAccountDetails,
    handlePasswordUpdates,
    handleAccountDeletion,
    deleteProfilePicture
}
