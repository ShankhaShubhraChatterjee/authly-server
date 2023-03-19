const { validationResult } = require('express-validator')

const { SQL } = require('./../utils/query')
const { clientErrors } = require('./../utils/error')
const { errorFormat } = require('./../configs/errorConfig')
const { client } = require('./../utils/db')
const { dehashPassword } = require('./../utils/hash')

const sendSigninPage = (req, res) => {
    if (req.session.auth && !req.session.passwordChanged) {
        res.redirect('/account')
        res.end()
    } else {
        res.render('pages/signin.pug', {
            error: clientErrors.signinErrors,
            userDoesntExist: clientErrors.signinUserExists,
        })
        clientErrors.signinUserExists = ''
        res.end()
    }
}

const handleSignin = async (req, res) => {
    let user = {
        uname: req.body.signin_username,
        pcode: req.body.signin_password,
    }

    let errors = validationResult(req).formatWith(errorFormat)
    if (errors.isEmpty()) {
        client
            .query(SQL.getAllFromUsername, [user.uname])
            .then(async (data) => {
                if (data.rows.length === 0) {
                    clientErrors.signinUserExists = 'User Doesnt Exist'
                    res.redirect('/signin')
                    res.end()
                } else {
                    let dehashed = await dehashPassword(
                        user.pcode,
                        data.rows[0].passcode
                    )
                    if (dehashed) {
                        req.session.auth = true
                        req.session.notifyLogOut = true
                        req.session.user = data.rows[0]
                        res.redirect('/account')
                        req.session.passwordChanged = false
                        res.end()
                    } else {
                        res.redirect('/signin')
                        res.end()
                    }
                }
            })
            .catch((err) => console.error(err))
    } else {
        try {
            clientErrors.signinErrors = errors.mapped()
        } catch (err) {
            console.error('No Error Occured')
        }
        res.redirect('/signin')
        res.end()
    }
}

module.exports = {
    sendSigninPage,
    handleSignin,
}
