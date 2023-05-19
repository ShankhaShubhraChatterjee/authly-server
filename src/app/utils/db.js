require('dotenv').config()
const { Pool } = require('pg')

const client = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
})
// const connectionString = process.env.DB_CONN
// const client = new Pool({connectionString})

module.exports = { client }
