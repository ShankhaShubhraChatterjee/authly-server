// src/app.js

// External Modules/Dependencies
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const fileUpload = require('express-fileupload')

// Utilities
const { UploadConfig } = require('./configs/upload.config')
const { Server } = require('./configs/server.config')
const { sessionOptions } = require('./services/session/session')

// Module Implementation
const app = express()
const router = express.Router()

// Router Imports

const home_router = require('./routes/home_routes.js')


// Global Config

app.use(cors())
app.use(session(sessionOptions))
app.use(fileUpload(UploadConfig))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, _, next) => {

    console.log(`Method:${req.method} | Url:${req.url}`)
    next()
})
router.use(home_router);
app.use(router)
app.listen(process.env.PORT, Server())