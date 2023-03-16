require('dotenv').config()
const nodeMailer = require('nodemailer')
const { google } = require('googleapis')

const OAuth2 = google.auth.OAuth2;

// const OAuthClient = new OAuth2({
// 	clientId:process.env.OAUTH_CLIENT_ID,
// 	clientSecret: process.env.OAUTH_CLIENT_SECRET,
// 	redirectUri: process.env.OAUTH_REDIRECT_URI
// })

// OAuthClient.setCredentials({
// 	refresh_token: process.env.OAUTH_REFRESH_TOKEN
// })
// const OAuthAccessToken = OAuthClient.getAccessToken()
const sendForgotPasswordPage = (req, res) => {

	res.render('pages/forgot-password.pug')
}

const sendPasswordResetURL = async (req, res) => {
	const html5 = 
	`
		<h1>Password Reset</h1>
		<p>Authly</p>
		<a href="#">link</a>
	`
	let transporter = nodeMailer.createTransport({
		service: 'Gmail',
		host: process.env.NODEMAILER_EMAIL,
		port: process.env.NODEMAILER_PORT,
		secure: true,
		auth: {
			type: "oauth2",
			clientId:process.env.OAUTH_CLIENT_ID,
			clientSecret: process.env.OAUTH_CLIENT_SECRET,
			refreshToken: process.env.OAUTH_REFRESH_TOKEN,
			accessToken:await OAuthAccessToken
		}
	})
	const msg = transporter.sendMail({
		from: `Foster Z (${process.env.NODEMAILER_EMAIL})`,
		to: `You (${req.body.password_reset_email})`,
		subject: "Reset Password",
		html: html5
	}, (err, data) => {
		if(err) console.error(err)
		else {
			console.log(`Message sent: ${data.messageId}`)
		}
	})
	console.log(OAuthAccessToken)
	transporter.close()
	res.redirect("/forgot-password")
}

module.exports = { sendForgotPasswordPage, sendPasswordResetURL }