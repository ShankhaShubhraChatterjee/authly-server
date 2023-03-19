// src/app/controllers/signupController.js

const { validationResult } = require('express-validator')

const { client } = require('../utils/db')
const { SQL } = require('./../utils/query')
const { clientErrors } = require('./../utils/error')
const { emailInUse, userExistsInDb } = require('./../utils/validate')
const { errorFormat } = require('./../configs/errorConfig')

const { hashPassword } = require('../utils/hash')

const sendSignUpPage = async (req, res) => {
    res.render('pages/signup.pug', {
        errors: clientErrors.signupErrors,
        userExists: clientErrors.signUpUserExists,
        emailUsed: clientErrors.signUpEmailInUse,
        auth: req.session.auth,
        user: req.session.user,
    })
    res.end()
}
const createUser = async (req, res) => {
    let user = {
        fname: req.body.signup_fullname,
        uname: req.body.signup_username,
        email: req.body.signup_email,
        pcode: req.body.signup_password,
        profile_image: undefined,
        profile_image_id: null,
    }
    let userExists = await userExistsInDb(user.uname)
    let emailUsed = await emailInUse(user.email)

    let errors = validationResult(req).formatWith(errorFormat)
    if (errors.isEmpty() && !userExists && !emailUsed) {
        let hashedPassword = await hashPassword(user.pcode, 10)
        client
            .query(SQL.createNewUser, [
                user.fname,
                user.uname,
                user.email,
                hashedPassword,
            ])
            .then(() => {
                console.log('Created New User')
                req.session.auth = true
                req.session.user = user
                req.session.user.pcode = hashedPassword
                res.redirect('/account')
                res.end()
            })
            .catch((err) => console.error(err))
    } else {
        try {
            clientErrors.signupErrors = errors.mapped()
            userExists
                ? (clientErrors.signUpUserExists = 'User Exists')
                : (clientErrors.signUpUserExists = null)

            emailUsed
                ? (clientErrors.signUpEmailInUse = 'Email Already Used')
                : (clientErrors.signUpEmailInUse = null)
        } catch (err) {
            console.error('No Error Occured')
        }
        res.redirect('/signup')
        res.end()
    }
}

module.exports = { sendSignUpPage, createUser }
