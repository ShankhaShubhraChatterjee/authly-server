// src/app/controllers/signupController.js

const { client } = require('../utils/db')
const regex = require('./../utils/regex')
const query = require('./../utils/query')

var errors = {
    fnameError: '',
    unameError: '',
    emailError: '',
    pcodeError: '',
}
const sendSignUpPage = (req, res) => {
    // if(req.session.auth){
    //     res.redirect("/account");
    // }
    // try {
    //     console.log(req.session.auth)
    // } catch(err) {
    //     console.log('Session Not Read As Undefined' + err)
    // }
    // if(req.session.auth) {
    //     res.redirect("/account")
    // }
    // console.log(req.session.cookie)
    console.log(req.session.auth)
    res.render('pages/signup.pug', errors)
}
const handleSignup = async (req, res) => {
    let user = {
        fname: req.body.signup_fullname,
        uname: req.body.signup_username,
        email: req.body.signup_email,
        pcode: req.body.signup_password
    }
    req.session.auth = true;
    console.log(req.session.auth)
    res.redirect('/signup')
    res.end()
}

module.exports = { sendSignUpPage, handleSignup }
