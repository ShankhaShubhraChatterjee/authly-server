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
    if(req.session.authenticated){
        res.redirect("/account");
    }
    try {
        console.log(req.session.user.uname)
    } catch {
        console.log('Session Not Read As Undefined')
    }
    if(req.session.auth) {
        res.redirect("/account")
    }
    console.log(req.sessionID)
    res.render('pages/signup.pug', errors)
}

const handleSignup = async (req, res) => {
    let user = {
        fname: req.body.signup_fullname,
        uname: req.body.signup_username,
        email: req.body.signup_email,
        pcode: req.body.signup_password
    }
    // client.query()
    res.redirect('/signup')
    res.end()
}

module.exports = { sendSignUpPage, handleSignup }
