const { client } = require('./../utils/db')
const { regex } = require('./../utils/regex')
const bcrypt = require('bcrypt')
const accountErrors = {
    fnameError: '',
    unameError: '',
    emailError: '',
    pcodeError: '',
    pcodeMatch: '',
}

const sendAccountPage = async (req, res) => {
    // if (!req.session.auth) {
    //     res.redirect('forbidden')
    // } else {
    // let fname = req.session.user.fname || null;
    // let uname = req.session.user.uname || null;
    // let email = req.session.user.email || null;
    // let avtar = req.session.user.avtar || null;
    let fname,
        email,
        uname,
        avtar = null
    fname = 'Foster Z'
    res.render('pages/account.pug', {
        userinfo: {
            fname: fname,
            uname: uname,
            email: email,
            avtar: avtar,
        },
        errors: accountErrors,
    })
}
const handleAccountUpdates = async (req, res) => {
    const updates = {
        fname: req.body.update_fname,
        uname: req.body.update_uname,
        email: req.body.update_email,
        avtar: req.body.update_avtar,
    }
    if (regex.fname.test(updates.fname)) {
        console.log('Updating Full Name')
        client.query(
            'UPDATE users SET fname=$1 WHERE uname=$2',
            [updates.fname, 'fossy0123'],
            (err, data) => {
                if (err) console.error(err)
                else {
                    console.log('Updated Successfully')
                }
            }
        )
    } else {
        if (updates.fname.length === 0) {
            console.log('Full Name Input Empty, Ignoring Update')
        } else {
            console.log('')
        }
    }
    if (regex.uname.test(updates.uname)) {
        console.log('Updating User Name')
        client.query(
            'UPDATE users SET uname WHERE uname=$1',
            [updates.uname],
            (err, data) => {
                if (err) console.error(err)
                else {
                    console.log('Updated Successfully')
                }
            }
        )
    } else {
        if (updates.uname.length === 0) {
            console.log('Username Input Empty, Ignoring Update')
        } else {
            console.log('')
        }
    }
    if (regex.fname.test(updates.email)) {
        console.log('Updating Email')
        client.query(
            'UPDATE users SET email WHERE email=$1',
            [updates.email],
            (err, data) => {
                if (err) console.error(err)
                else {
                    console.log('Updated Successfully')
                }
            }
        )
    } else {
        if (updates.email.length === 0) {
            console.log('Email Input Empty, Ignoring Update')
        } else {
            console.log('')
        }
    }
    res.redirect('/account')
    res.end()
}

const handleAccountLogOut = async (req, res) => {
    await req.session.destroy()
    await res.redirect('/')
}
const handleAccountDeletion = async (req, res) => {
    console.log('Deleted')
    client.query(
        'DELETE FROM users WHERE uname=$1',
        [req.session.user.uname],
        (err, _) => {
            if (err) console.error(err)
            else {
                res.redirect('/')
            }
        }
    )
}

module.exports = {
    sendAccountPage,
    handleAccountLogOut,
    handleAccountUpdates,
    handleAccountDeletion,
}
