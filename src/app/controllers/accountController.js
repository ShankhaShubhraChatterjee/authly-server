require('dotenv').config()
const { client } = require('./../utils/db')
const { SQL } = require('./../utils/query')
const { clientErrors } = require('./../utils/error')
const { imageKit } = require('./../utils/imagekit')
const { userExistsInDb, emailInUse } = require('../utils/validate')
const { regex } = require('../utils/regex')

// Send Account Template To Client
const sendAccountPage = (req, res) => {
    console.log(req.session.user)
    if (req.session.auth) {
        res.render(
            "pages/account.pug", 
            { 
                errors: clientErrors.accountErrors, 
                user: req.session.user, 
                auth: req.session.auth 
            }
        )
        clientErrors.accountErrors.accountFnameError = null;
        clientErrors.accountErrors.accountUnameError = null;
        clientErrors.accountErrors.accountEmailError = null;
        clientErrors.accountErrors.accountPcodeError = null;
        clientErrors.accountErrors.accountEmailUsed = null;
        clientErrors.accountErrors.accountUserExists = null;
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
        confirmPassword: req.body.account_update_confirm_password
    }
    let regexValues = {
        fname: regex.fname.test(updates.fname),
        uname: regex.uname.test(updates.uname),
        email: regex.email.test(updates.email),
        oldPassword: regex.pcode.test(updates.currentPassword),
        newPassword: regex.pcode.test(updates.newPassword),
        confirmPassword: regex.pcode.test(updates.confirmPassword)
    }
    let userExists = await userExistsInDb(updates.uname);
    let emailTaken = await emailInUse(updates.email);
    
    if (updates.fname.length > 0) {
        if (regexValues.fname) {
            console.log("Working")
            await client
                .query(SQL.updateFullname, [updates.fname, req.session.user.uname])
                .then(() => {
                    console.log("Then Working")
                    req.session.user.fname = updates.fname
                })
                .catch((err) => console.error(err))
        }
        else {
            if (!regexValues.fname) clientErrors.accountErrors.accountFnameError = "Name Invalid"
        }
    }
    if (updates.uname.length > 0) {
        if (regexValues.uname && !userExists) {
            console.log("Working")
            await client
                .query(SQL.updateUsername, [updates.uname, req.session.user.uname])
                .then(() => {
                    console.log("Then Working")
                    req.session.user.uname = updates.uname
                })
                .catch((err) => console.error(err))
        }
        else {
            if (!regexValues.uname) clientErrors.accountErrors.accountUnameError = "Username Invalid"

            if (userExists) clientErrors.accountErrors.accountUserExists = "User Exists"
        }
    }
    if (updates.email.length > 0) {
        if (regexValues.email && !emailTaken) {
            await client
                .query(SQL.updateEmail, [updates.email, req.session.user.uname])
                .then(() => {
                    console.log("Then Working")
                    req.session.user.email = updates.email
                })
                .catch((err) => console.error(err))
        }
        else {
            if (!regexValues.email) clientErrors.accountErrors.accountEmailError = "Email Invalid"

            if (emailTaken) clientErrors.accountErrors.accountEmailUsed = "Email In Use"
        }
    }

    if (updates.currentPassword.length > 0) {
        if (regexValues.oldPassword) {

        }
        else {
            clientErrors.accountErrors.accountCurrentPasswordError = "Invalid Password"
        }
    }
    setTimeout(() => {
        res.redirect('/account')
        res.end()
    }, 1500)
    
}
// Handles Profile Image Upload
const handleProfileImage = async (req, res) => {
    let image = req.files;
    let user = req.session.user.uname;
    if (req.files === null) {
        clientErrors.accountErrors.accountImageUploadError = "Please Select An Image"
        res.redirect("/account")
        res.end()
    }
    else {
        if (req.session.user.profile_image !== null) {
            imageKit.deleteFile(`${await req.session.user.profile_image_id}`, 
                (err, result) => {
                    if (err) console.error(err)
                    else {
                        console.log(result)
                    }
                })
            imageKit.upload({
                file: image.profile_picture.data,
                fileName: image.profile_picture.name
            }, async (err, result) => {
                if (err) console.error(err)
                else { 
                    await client
                        .query(SQL.modifyProfileImage, [result.url, result.fileId, user])
                        .then(async () => {
                            console.log(result)
                            req.session.user.profile_image = await result.url
                            req.session.user.profile_image_id = await result.fileId

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
            imageKit.upload({
                file: image.profile_picture.data,
                fileName: image.profile_picture.name
            }, async (err, result) => {
                if (err) console.error(err)
                else { 
                    await client
                        .query(SQL.modifyProfileImage, [result.url, result.fileId, user])
                        .then(async () => {
                            req.session.user.profile_image = await result.url
                            req.session.user.profile_image_id = await result.fileId

                        })
                        .catch((err) => console.error(err))
                }
            })
            setTimeout(() => {
                res.redirect("/account")
                res.end()
            }, 2500)
        }
    }
}
// Handles User Account LogOut
const handleAccountLogOut = async (req, res) => {
    req.session.destroy(() => {
        res.redirect("/")
        res.end()
    })
}
// Handles Profile Picture Deletion
const handleProfilePicDeletion = async (req, res) => {
    let user = req.session.user.uname;
    if (req.session.user.profile_image !== null) {
        imageKit.deleteFile(
            `${req.session.user.profile_image_id}`, 
            async (err, _) => {
                if (err) console.error(err)
                else {
                    await client
                        .query(SQL.modifyProfileImage, [null, null, user])
                        .then(async () => {
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
    handleAccountUpdates,
    handleAccountDeletion,
    handleProfilePicDeletion
}
