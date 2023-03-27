require('dotenv').config()
const db = require('./../utils/db')
const server = () => {
    if (process.env.NODE_ENV === 'production') {
        console.log(
            `Server Running On ${process.env.APP_URL}`
        )
    } else {
        console.log(
            `Server Running On ${process.env.APP_HOST}:${process.env.APP_PORT}`
        )
    }

    if (db) {
        console.log('Database Connection Successfully Established')
    } else {
        console.log('Error Establish Connection To DataBase')
    }
}
module.exports = { server }
