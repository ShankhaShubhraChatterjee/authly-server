require('dotenv').config()

const DB = require('./../utils/db')

const Server = () => {
    process.env.NODE_ENV === 'production' ?
        console.log(`Server Running On ${process.env.APP_URL}`):
        console.log(`Server Running On ${process.env.HOST}:${process.env.PORT}`)
        
    DB ? 
        console.log('Database Connection Successfully Established'):
        console.log('Error Establish Connection To DataBase')
}
module.exports = { Server }
