require('dotenv').config()
const nodeMailer = require('nodemailer')
const crypto = require('node:crypto')
const path = require('path')
const { google } = require('googleapis')
const pug = require('pug')
const { emailInUse } = require('../utils/validate')
const { clientErrors } = require('../utils/error')
const OAuth2 = google.auth.OAuth2

const token = crypto.randomBytes(64).toString('hex')

const sendForgotPasswordPage = (req, res) => {
    res.render('pages/forgot-password.pug', {
        resetErrors: clientErrors.resetErrors,
    })
    Object.keys(clientErrors.resetErrors).forEach(
        (index) => (clientErrors.resetErrors[index] = null)
    )
}

const sendEmailSentPage = (req, res) => {
    res.render('pages/email-success.pug')
}

const createTransporter = async () => {
    const OAuthClient = new OAuth2({
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        redirectUri: process.env.OAUTH_REDIRECT_URI,
    })

    OAuthClient.setCredentials({
        refresh_token: process.env.OAUTH_REFRESH_TOKEN,
    })
    const OAuthAccessToken = await OAuthClient.getAccessToken()
    let transporter = nodeMailer.createTransport({
        service: 'Gmail',
        host: process.env.NODMAILER_HOST,
        port: process.env.NODEMAILER_PORT,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: process.env.NODEMAILER_EMAIL,
            clientId: process.env.OAUTH_CLIENT_ID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
            accessToken: OAuthAccessToken,
        },
    })
    return transporter
}
const sendPasswordResetURL = async (req, res) => {
    let user = await req.body.password_reset_email
    const html5 = pug.renderFile(
        path.join(
            __dirname,
            '../',
            '../',
            './client',
            'views',
            'modules',
            'email.pug'
        ),
        {
            reset_url: `${process.env.DOMAIN}?email=${user}&token=${token}`,
            pretty: false,
        }
    )
    const emailTransporter = await createTransporter()
    const checkEmail = await emailInUse(user)
    if (checkEmail) {
        emailTransporter
            .sendMail({
                from: `Foster Z (${process.env.NODEMAILER_EMAIL})`,
                to: `${user}`,
                subject: 'Reset Password',
                html: html5,
            })
            .then((data) => {
                req.session.reset_email = user
                req.session.reset_token = token

                console.log(req.session.reset_email)
                console.log(req.session.reset_token)
                console.log(`Message sent: ${data.messageId}`)
            })
            .then(() => res.redirect('/forgot-password/email-success'))
            .catch((err) => console.error(err))
    } else {
        clientErrors.resetErrors.emailExists =
            'Account With This Email Doesnt Exist'
        console.log(clientErrors.resetErrors.emailExists)
        res.redirect('/forgot-password')
    }
}

module.exports = {
    sendForgotPasswordPage,
    sendEmailSentPage,
    sendPasswordResetURL,
}
