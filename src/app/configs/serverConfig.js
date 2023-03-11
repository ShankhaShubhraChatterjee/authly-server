require('dotenv').config()
const db = require('./../utils/db')
const server = () => {
    console.log(`Server Running On ${process.env.APP_URL}:${process.env.APP_PORT}`)
    if (db) {
        console.log('Database Connection Successfully Established')
    } else {
        console.log('Error Establish Connection To DataBase')
    }
}
module.exports = { server }
