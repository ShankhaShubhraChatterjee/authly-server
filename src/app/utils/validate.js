const { client } = require('./db')
const checkUserExistance = (username) => {
    client.query(
        `SELECT uname FROM users WHERE uname=$1`,
        [username],
        (err, data) => {
            if (err) console.error(err)
            else {
                let user = data.rows
                if (!user) {
                    return true
                } else {
                    return false
                }
            }
        }
    )
}
const checkForEmptyValue = (entry, type) => {
    if (!entry || entry.length <= 1) {
        console.log(`${type} Can't Be Empty`)
        return false
    } else {
        console.log('OK')
        return true
    }
}

module.exports = {
    checkForEmptyValue,
    checkUserExistance,
}
