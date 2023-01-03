// src/app/controllers/signupController.js

const { client } = require('../utils/db')
const regex = require('./../utils/regex')
const query = require('./../utils/query')
const {
    validateUserInputs,
    checkForEmptyValue,
    checkUserExistance,
    outputErrors,
} = require('./../utils/validate')
var errors = {
    fnameError: '',
    unameError: '',
    emailError: '',
    pcodeError: '',
}
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
    if (
        !regex.fname.test(user.fname) ||
        !regex.uname.test(user.uname) ||
        !regex.email.test(user.email) ||
        !regex.pcode.test(user.pcode)
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
        if (
            (regex.fname.test(user.fname),
            regex.uname.test(user.uname),
            regex.email.test(user.email),
            regex.pcode.test(user.pcode))
        ) {
            req.session.auth = true;
            req.session.user = user;
            res.redirect("/account")
        }
            res.end()
    } else {
        req.session.auth = true
        req.session.user = user
        setTimeout(() => {
            res.redirect('/account')
            res.end()
        }, 1500)
    }
}

module.exports = { sendSignUpPage, createUser }
