const bcrypt = require('bcrypt')
const { client } = require('./../utils/db')

const handlePasswordUpdates = async (req, res) => {
    const passcode = {
        currentPassword: req.body.current_password,
        newPassword: req.body.new_password,
        confirmPassword: req.body.confim_password,
    }
    const queries = {
        getPasswordQuery: 'SELECT passcode FROM users WHERE uname=$1'
    }
    
}
const getPasswordForUname = async (query, param) => {
    await client
    .query(query, param)
    .then(data => {
        if (err) console.error(err)
        else data ? data.rows[0] : 'No Entries Found'
    })
}
const matchPasswords = (target, match) => {
    target === match ? true : false;
}
const matchPasswordFromDB = async (query, param) => {
    client
    .query(query, param)
    .then(data =>{ return data })
    .catch(err => console.error(err))
}
const comparePassword = async (password, target) => {
    bcrypt.compare(
        password,
        target,
        (err, pcode) => {
            if (err) console.error(err)
            else { pcode ? true : false }
        }
    )
}
module.exports = { handlePasswordUpdates }
