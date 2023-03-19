require('dotenv').config()
const nodeMailer = require('nodemailer')
const fs = require('fs')
const path = require('path')
const { google } = require('googleapis')

const OAuth2 = google.auth.OAuth2

const sendForgotPasswordPage = (req, res) => {
    res.render('pages/forgot-password.pug')
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
    const html5 = fs.readFileSync(
        path.join(__dirname, '../../', 'client', 'views', 'email.html'),
        'UTF-8'
    )
    let user = await req.body.password_reset_email
    const emailTransporter = await createTransporter()
    emailTransporter.sendMail(
        {
            from: `Foster Z (${process.env.NODEMAILER_EMAIL})`,
            to: `${user}`,
            subject: 'Reset Password',
            html: html5,
        },
        (err, data) => {
            if (err) console.error(err)
            else {
                console.log(`Message sent: ${data.messageId}`)
            }
        }
    )
    emailTransporter.close()
    res.redirect('/reset-password')
}

module.exports = {
    sendForgotPasswordPage,
    sendEmailSentPage,
    sendPasswordResetURL,
}
