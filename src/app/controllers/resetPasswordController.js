const { client } = require("../utils/db");
const { clientErrors } = require("../utils/error");
const { hashPassword } = require("../utils/hash");
const { SQL } = require("../utils/query");
const { regex } = require("../utils/regex");
const { matchConfirmPassword } = require("../utils/validate");

const sendResetPasswordPage = (req, res) => {
    const token = req.query.token;
    const email = req.query.email;
    if (token === req.session.reset_token && email === req.session.reset_email) {
        res.render('pages/reset-password.pug', { resetErrors: clientErrors.resetErrors })
        Object.keys(clientErrors.resetErrors).forEach(
            (index) => (clientErrors.resetErrors[index] = null)
        )
    }
    else {
        console.log(req.session.reset_token)
        console.log(email === req.session.reset_email)
        res.render("pages/forbidden.pug")
    }
}

const resetPasswordForUser = async (req, res) => {

    const passcode = {
        newPassword: req.body.reset_new_password,
        confirmPassword: req.body.reset_confirm_password
    }

    const validate = {
        newPass: regex.pcode.test(passcode.newPassword),
        confirm: regex.pcode.test(passcode.confirmPassword)
    }
    console.log(passcode.newPassword)
    const hash = await hashPassword(passcode.newPassword, 10)
    const passwordsMatches = matchConfirmPassword(passcode.newPassword, passcode.confirmPassword)
    setTimeout(() => {
        if (validate.newPass && validate.confirm && passwordsMatches) {
            console.log(hash)
            console.log(req.session.reset_email)
            client
                .query(SQL.updateUserPassword, [hash, req.session.reset_email])
                .then((_) => {
                    res.redirect(`/signin`)
                    res.end()
                })
                .catch((err) => console.error(err))
        }
        else {
            res.redirect(`/user/reset-password?email=${req.session.reset_email}&token=${req.session.reset_token}`)
            !validate.newPass ? clientErrors.resetErrors.newPassword = "New Password Invalid" : ""
            !validate.newPass ? clientErrors.resetErrors.confirmPassword = "Confirm Password Invalid" : ""
            !passwordsMatches ? clientErrors.resetErrors.passwordsMatches = "Passwords Dont Match" : ""
        }
    }, 1500)

}

module.exports = { sendResetPasswordPage, resetPasswordForUser }
