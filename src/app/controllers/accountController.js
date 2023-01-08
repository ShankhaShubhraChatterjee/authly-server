const { client } = require('./../utils/db')
const { regex } = require('./../utils/regex')

const accountErrors = {
    fnameError: '',
    unameError: '',
    emailError: '',
    pcodeError: '',
    pcodeMatch: '',
}
const sendAccountPage = async (req, res) => {
    // if (!req.session.auth) {
    //     res.render('pages/forbidden.pug')
    // } else {
    // let fname = req.session.user.fname || null;
    // let uname = req.session.user.uname || null;
    // let email = req.session.user.email || null;
    let fname,
        email,
        uname = null
    res.render('pages/account.pug', {
        userinfo: {
            fname: fname,
            uname: uname,
            email: email,
        },
        errors: accountErrors,
    })
}
const handleAccountUpdates = (req, res) => {
    const updates = {
        fname: req.body.update_fname,
        uname: req.body.update_uname,
        email: req.body.update_email,
    }
    if(regex.fname.test(updates.fname)){
        console.log("Updating Full Name")
    }
    if(regex.uname.test(updates.uname)){
        console.log("Updating Full Name")
    }
    if(regex.fname.test(updates.fname)){
        console.log("Updating Full Name")
    }
}
const handlePasswordUpdates = (req, res) => {
    const passcode = {
        currentPassword:req.body.current_password,
        newPassword:req.body.new_password,
        confirmPassword:req.body.confim_password
    }
}
const handleAccountLogOut = (req, res) => {
    res.json({ msg: 'Logged Out' })
}
const handleAccountDeletion = (req, res) => {
    res.json({ msg: 'Account Deleted' })
}

module.exports = {
    sendAccountPage,
    handleAccountLogOut,
    handleAccountUpdates,
    handleAccountDeletion,
}
