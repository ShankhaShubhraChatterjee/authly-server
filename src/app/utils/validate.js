const { client } = require('./db')
const { SQL } = require('./query')


function userExistsInDb(username) {
    return client
        .query(SQL.getUsername, [username])
        .then((data) => { data.rows.length === 0 ? false : true })
        .catch((err) => console.error(err))
}

function emailInUse(email) {
    return client
        .query(SQL.getUserEmail , [email])
        .then((data) => { data.rows.length === 0 ? true : false })
        .catch((err) => console.error(err))
}

module.exports = {
    userExistsInDb,
    emailInUse
}