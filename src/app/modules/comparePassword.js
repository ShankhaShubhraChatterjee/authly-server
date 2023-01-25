const bcrypt = require('bcrypt')
const { client } = require('./../utils/db')

const updateOldPassword = async (query, param) => {
    await client.query(query, param).then(() => {
        if (err) console.error(err)
        else 'Password Updated Successfully'
    })
}
const matchPasswords = (input, target) => {
    input === target ? true : false
}
const matchPasswordFromDB = async (query, param, password) => {
    await client
        .query(query, param)
        .then((data) => {
            return data
        })
        .then((data) => {
            bcrypt.compare(password, data, (err, pcode) => {
                if(err) console.error(err)
                else {
                    pcode ? true : false
                }
                
            })
        })
        .catch((err) => console.error(err))
}
module.exports = {
    matchPasswordFromDB,
    matchPasswords,
    updateOldPassword,
}
