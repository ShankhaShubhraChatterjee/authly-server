const { client } = require('./../utils/db')
const { regex } = require('./../utils/regex')
const bcrypt = require('bcrypt')
const {
    updateOldPassword,
    matchPasswordFromDB,
    matchPasswords,
} = require('../modules/comparePassword')

const accountErrors = {
    fnameError: '',
    unameError: '',
    emailError: '',
    pcodeError: '',
    pcodeMatchError: '',
    pcodeUpdateError: '',
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
    const passcode = {
        currentPassword: req.body.current_password,
        newPassword: req.body.new_password,
        confirmPassword: req.body.confim_password,
    }
    const queries = {
        getPasswordQuery: 'SELECT passcode FROM users WHERE uname=$1',
    }
    let oldPasswordMatches = await matchPasswordFromDB(
        queries.getPasswordQuery,
        ['fossy0123'],
        passcode.currentPassword
    )
    let newPasswordMatches = matchPasswords(
        passcode.newPassword,
        passcode.confirmPassword
    )
    // let updateOldPassword = await updateOldPassword()
    if (
        regex.pcode.test(
            passcode.currentPassword,
            passcode.newPassword,
            passcode.confirmPassword
        )
    ) {
        if (oldPasswordMatches) {
            if (newPasswordMatches) {
                console.log('Password Updated Successfully')
            } else {
                accountErrors.pcodeUpdateError = 'Error Updating Pasword'
            }
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
