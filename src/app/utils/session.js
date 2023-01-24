// src/app/utils/session.js
require('dotenv').config()

const session = require('express-session')
const { client } = require('./db')
const { v5: uuidv5 } = require('uuid')
const pgStore = require('connect-pg-simple')(session)

const sessionOptions = {
    genid: function () {
        return uuidv5('Authly', process.env.UUID_NAMESPACE)
    },
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 1, secure: false },
    resave: false,
    saveUninitialized: false,
    store: new pgStore({
        pool: client,
        createTableIfMissing: true,
    }),
}

module.exports = { sessionOptions }
