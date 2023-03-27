// src/app.js
// Common Core Modules
const path = require('path')

// External Modules/Dependencies
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const fileUpload = require('express-fileupload')
// Utilities
const { uploadConfig } = require('./app/configs/uploadConfig')
const { server } = require('./app/configs/serverConfig')
const { sessionOptions } = require('./app/utils/session')
const { routes } = require('./app/utils/route')

// Module Implementation
const app = express()
const router = express.Router()

// Global Config
app.use(cors())
app.use(session(sessionOptions))
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'client', 'views'))
app.use(express.static(path.join(__dirname, 'client', 'public')))
app.use(express.static(path.join(__dirname, 'client', 'assets')))
app.use(fileUpload(uploadConfig))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    console.log(`Method:${req.method} | Url:${req.url}`)
    next()
})

router.get('/signout', (req, res) => {
    req.session.auth = false
    req.session.destroy()
    res.redirect('/')
    res.end()
})

router.get('/forbidden', (req, res) => {
    res.render('pages/forbidden.pug')
})

router.use('/', routes.homeRoute)
router.use('/signin', routes.signinRoute)
router.use('/signup', routes.signupRoute)
router.use('/forgot-password', routes.forgotPassword)
router.use('/account', routes.accountRoute)
router.use('/user', routes.resetPassword)
app.use(router)
app.use('*', (_, res) => {
    res.render('pages/notfound.pug')
})
app.listen(process.env.PORT, server)
// CPassword0123#
