const bcrypt = require('bcrypt')

const dehashPassword = async (password, hash) => {
    let passcode = bcrypt.compare(password, hash).then(data => {
        return data;
    }).catch((err) => {
        console.error(err)
    })
    return passcode;
}

module.exports = { dehashPassword }