const { client } = require('./../utils/db')
const { regex } = require('./../utils/regex')
const { SQL } = require('./../utils/query')
const { errors } = require('./../utils/error')
const bcrypt = require('bcrypt')
const {
    updateOldPassword,
    matchPasswordFromDB,
    matchPasswords,
} = require('../modules/comparePassword')


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
    const user = {
        fname: req.body.update_fname,
        uname: req.body.update_uname,
        email: req.body.update_email,
        avtar: req.body.update_avtar,
        currentPassword: req.body.current_password,
        newPassword: req.body.new_password,
        confirmPassword: req.body.confim_password
    }
    let oldPasswordMatches = await matchPasswordFromDB(
        SQL.getPasswordQuery,
        ['fossy0123'],
        user.currentPassword
    )
    let newPasswordMatches = matchPasswords(
        user.newPassword,
        user.confirmPassword
    )
    if (
        regex.pcode.test(
            user.currentPassword,
            user.newPassword,
            user.confirmPassword
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
    client
    .query(SQL.deleteByUsername, [req.session.user.uname])
    .then(async () => {
        await req.session.destroy();
        await res.redirect('/')
    })
    .catch(err => console.error(err))
}

module.exports = {
    sendAccountPage,
    handleAccountLogOut,
    handleAccountUpdates,
    handleAccountDeletion,
}
