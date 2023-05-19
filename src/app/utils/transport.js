require('dotenv').config()
const { google } = require('googleapis')
const nodeMailer = require('nodemailer');

const OAuth2 = google.auth.OAuth2

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

module.exports = { createTransporter }