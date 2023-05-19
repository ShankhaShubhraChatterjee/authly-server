require('dotenv').config()
const db = require('./../utils/db')
const server = () => {
    process.env.NODE_ENV === 'production' ?
        console.log(`Server Running On ${process.env.APP_URL}`):
        console.log(`Server Running On ${process.env.HOST}:${process.env.PORT}`)
        
    db ? 
        console.log('Database Connection Successfully Established'):
        console.log('Error Establish Connection To DataBase')
}
module.exports = { server }
