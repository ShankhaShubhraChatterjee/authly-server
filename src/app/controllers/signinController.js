const { client } = require('../utils/db')

var userExistsError, provideUname, providePassword
const signinPage = (req, res) => {
    console.log(req.session.auth)
    if (req.session.auth) {
        res.redirect('/account')
        res.end()
    } else {
        res.render('pages/signin.pug', {
            provideUname: provideUname,
            userExistsError: userExistsError,
            providePassword: providePassword,
        })
        res.end()
    }
}

const handleSignin = async (req, res) => {
    let uname = req.body.signin_username
    let pcode = req.body.signin_password

    if (!uname) {
        provideUname = 'Please Provide Username'
        console.log(provideUname)
    }
    if (!pcode) {
        providePassword = 'Please Provide Password'
        console.log(providePassword)
    }
    // client.query(
    //     `SELECT * FROM users WHERE uname='${req.body.signin_username}' AND passcode='${req.body.signin_password}'`,
    //     (err, data) => {
    //         if (err) console.log(err)
    //         if (data.rows[0]) {
    //             console.log(data.rows[0])
    //             req.session.authenticated = true
    //             console.log(req.session.authenticated)
    //         } else {
    //             userExistsError = 'User Doesnt Exist'
    //             console.log(userExistsError)
    //         }
    //     }
    // )
    req.session.auth = true
    res.end()
}

module.exports = {
    handleSignin,
    signinPage,
}
