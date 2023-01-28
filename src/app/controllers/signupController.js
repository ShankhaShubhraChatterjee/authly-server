// src/app/controllers/signupController.js

const { client } = require('../utils/db')
const { regex } = require('./../utils/regex')
const { SQL } = require('./../utils/query')
const { errors } = require('./../utils/error')
const { userExistsInDb } = require('./../utils/validate')
const bcrypt = require('bcrypt')

const sendSignUpPage = (req, res) => {
    res.render('pages/signup.pug', { errors: errors })
    console.log(req.session.auth)
    res.end()
}
const createUser = async (req, res) => {
    let user = {
        fname: req.body.signup_fullname,
        uname: req.body.signup_username,
        email: req.body.signup_email,
        pcode: req.body.signup_password,
    }
    let userExists = await userExistsInDb(user.uname)

    if (
        !regex.fname.test(user.fname) ||
        !regex.uname.test(user.uname) ||
        !regex.email.test(user.email) ||
        !regex.pcode.test(user.pcode) ||
        userExists
    ) {
        if (regex.fname.test(user.fname)) {
            errors.fnameError = 'Name Valid'
        } else {
            errors.fnameError = 'Name Not Valid'
        }

        if (regex.uname.test(user.uname)) {
            errors.unameError = 'Username Valid'
        } else {
            errors.unameError = 'Username Not Valid'
        }
        if (userExists) {
            errors.unameError = 'Username Already Taken'
        } else {
            errors.unameError = 'Username Available'
        }
        if (regex.email.test(user.email)) {
            errors.emailError = 'Email Valid'
        } else {
            errors.emailError = 'Email Not Valid'
        }

        if (regex.pcode.test(user.pcode)) {
            errors.pcodeError = 'Password Valid'
        } else {
            errors.pcodeError = 'Password Not Valid'
        }
        res.redirect('/signup')
        res.end()
    } else {
        if (
            (regex.fname.test(user.fname),
            regex.uname.test(user.uname),
            regex.email.test(user.email),
            regex.pcode.test(user.pcode),
            !userExists)
        ) {
            req.session.auth = true
            req.session.user = user
            let salt = await bcrypt.genSalt()
            let hashedPassword = await bcrypt.hash(user.pcode, salt)
            bcrypt.compare(user.pcode, hashedPassword, (err, result) => {
                if (err) console.error(err)
                else {
                    client
                        .query(SQL.createNewUser, [
                            user.fname,
                            user.uname,
                            user.email,
                            hashedPassword,
                        ])
                        .then((data) => {
                            console.log('Success')
                        })
                        .catch((err) => {
                            console.error(err)
                        })
                }
            })
        }
        setTimeout(() => {
            res.redirect('/account')
            res.end()
        }, 1500)
    }
}

module.exports = { sendSignUpPage, createUser }
