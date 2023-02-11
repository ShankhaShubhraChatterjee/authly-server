const bcrypt = require('bcrypt')
const session = require('express-session')
const { validationResult } = require('express-validator')

const { regex } = require('./../utils/regex')
const { SQL } = require('./../utils/query')
const { clientErrors } = require('./../utils/error')
const { client } = require('./../utils/db')
const { dehashPassword } = require('./../utils/dehash')

const sendSigninPage = (req, res) => {
    if (req.session.auth) {
        res.redirect('/account')
        res.end()
    } else {
        res.render('pages/signin.pug', { error: clientErrors })
        res.end()
    }
}

const handleSignin = async (req, res) => {
    let user = {
        uname: req.body.signin_username,
        pcode: req.body.signin_password
    }
    client
        .query(SQL.getAllFromUsername, [user.uname])
        .then(async (data) => {
            if (data.rows.length === 0) {
                console.log('User Doesnt Exist')
                errors.userExists = 'User Doesnt Exist'
                res.redirect('/signin')
                res.end()
            } else {
                let dehashed = await dehashPassword(
                    user.pcode,
                    data.rows[0].passcode
                )
                if (dehashed) {
                    console.log(dehashed)
                    console.log('User Exists')
                    req.session.auth = true;
                    req.session.notifyLogOut = true;
                    req.session.user = data.rows[0];
                    res.redirect('/')
                    res.end()
                } else {
                    console.log(dehashed)
                    console.log('Wrong Password')
                    displayErrorsOnClient(
                        'Wrong Password',
                        errors.pcodeError
                    )
                    console.log(errors.pcodeError)
                    res.redirect('/signin')
                    res.end()
                }
            }
        })
        .catch((err) => console.error(err))
}

module.exports = {
    sendSigninPage,
    handleSignin,
}
