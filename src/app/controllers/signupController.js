// src/app/controllers/signupController.js

const { client } = require('../utils/db')
const { SQL } = require('./../utils/query')
const { clientErrors } = require('./../utils/error')
const { userExistsInDb } = require('./../utils/validate')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')

const sendSignUpPage = (req, res) => {
    // if (req.session.auth) {
    //     res.redirect("/account")
    //     res.end()
    // }
    // else {
    res.render('pages/signup.pug', { errors: clientErrors.signupErrors, userExists: clientErrors.signUpUserExists })
    res.end()
    // }
    
}
const createUser = async (req, res) => {
    let user = {
        fname: req.body.signup_fullname,
        uname: req.body.signup_username,
        email: req.body.signup_email,
        pcode: req.body.signup_password,
    }
    let userExists = await userExistsInDb(user.uname)
    const errorFormat = ({ location, msg, param, value, nestedErrors }) => {
        return `${msg}`;
    };
    const errors = validationResult(req).formatWith(errorFormat)
    if (!errors.isEmpty()) {
        try { 
            clientErrors.signupErrors = errors.mapped()
        }
        catch (err) { console.error("No Error Occured") }
        res.redirect("/signup")
        res.end()
    }
    else {
        client.query(SQL.getAllFromUsername, [user.uname])
            .then((data) => {
                if (data.rows.length === 0) {
                    clientErrors.signUpUserExists = ""
                    console.log("Can Create Account")
                    console.log(userExists)
                    res.redirect("/signup")
                    res.end()
                }   
                else {
                    clientErrors.signUpUserExists = "Username Already Taken"
                    res.redirect("/signup")
                    res.end()
                }
            }
        )
    }
}

module.exports = { sendSignUpPage, createUser }
