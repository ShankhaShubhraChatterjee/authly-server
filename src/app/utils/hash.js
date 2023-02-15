const bcrypt = require('bcrypt')

async function hashPassword(password, salt) {
    return await bcrypt.hash(password, salt)
        .then(data => data)
        .catch(err => console.error(err))
}

async function dehashPassword(password, hash) {
    return await bcrypt.compare(password, hash)
        .then(data => data)
        .catch(err => console.error(err))
}

module.exports = { hashPassword, dehashPassword } 