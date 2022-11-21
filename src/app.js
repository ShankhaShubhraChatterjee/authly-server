// Common Core Modules
const path = require('path')

// External Modules/Dependencies
require('dotenv').config()
const express = require('express')
const cors = require('cors')

// Module Implementation
const app = express()

// Database Connection
const db = require('./app/db/db')

// Routes Imports
const homeRoute = require('./app/routes/homeRoute.js')
const loginRoute = require('./app/routes/loginRoute.js')
const signupRoute = require('./app/routes/signupRoute.js')
const accountRoute = require('./app/routes/accountRoute.js')

// Global Config
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, process.env.VIEWS_DIR))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, process.env.STATIC_DIR)))
app.use((req, res, next) => {
    console.log(`Method:${req.method} | Url:${req.url}`)
    next()
})
app.use(cors())

app.use('/', homeRoute)
app.use('/login', loginRoute)
app.use('/signup', signupRoute)
app.use('/account', accountRoute)

app.listen(process.env.APP_PORT, () => {
    console.log(
        `Server Running On ${process.env.APP_URL}:${process.env.APP_PORT}`
    )
})
