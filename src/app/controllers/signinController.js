const { regex } = require('./../utils/regex')
const { client } = require('./../utils/db')

var errors = {
    unameError: '',
    pcodeError: '',
    userExists: '',
}

const sendSigninPage = (req, res) => {
    res.render('login.ejs', { error: errors })
    res.end()
}

const handleSignIn = async (req, res) => {
    let user = {
        uname: req.body.signin_username,
        pcode: req.body.signin_password,
    }

    if ((!regex.uname.test(user.uname), !regex.uname.test(user.pcode))) {
        if (regex.uname.test(user.uname)) {
            errors.unameError = 'OK'
        } else {
            errors.unameError = 'Invalid Username'
        }
        if (regex.pcode.test(user.pcode)) {
            errors.pcodeError = 'OK'
        } else {
            errors.pcodeError = 'Invalid Password'
        }
        res.redirect('/signin')
        res.end()
    } else {
        client.query(
            'SELECT * FROM users WHERE uname=$1',
            [user.uname],
            (err, data) => {
                if (err) console.error(err)
                else {
                    if (data.rows.length === 0) {
                        console.log('User Doesnt Exist')
                        errors.userExists = 'User Doesnt Exist'
                        res.redirect('/signin')
                        res.end()
                    } else {
                        bcrypt.compare(
                            user.pcode,
                            data.rows[0].passcode,
                            (err, password) => {
                                if (err) console.log(err)
                                else {
                                    if (!password) {
                                        errors.pcodeError = 'Wrong Password'
                                        console.log(errors.pcodeError)
                                        res.redirect('/signin')
                                        res.end()
                                    } else {
                                        console.log('User Exists')
                                        console.log(
                                            `${data.rows[0].uname} - ${data.rows[0].passcode}`
                                        )
                                        req.session.user = data.rows[0]
                                        res.redirect('/')
                                        res.end()
                                    }
                                }
                            }
                        )
                    }
                }
            }
        )
    }
}

module.exports = {
    sendSigninPage,
    handleSignIn,
}
