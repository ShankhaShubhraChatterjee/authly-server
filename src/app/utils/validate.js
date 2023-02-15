const { client } = require('./db')
const { SQL } = require('./query')


async function userExistsInDb(username) {
   return await client
                .query(SQL.getUsername, [username])
                .then(data => data.rows.length === 0 ? false : true)
                .catch(err => console.error(err))
}

async function emailInUse(email) {
   return await client
                .query(SQL.getUserEmail, [email])
                .then(data => data.rows.length === 0 ? false : true)
                .catch(err => console.error(err))
}

module.exports = {
    userExistsInDb,
    emailInUse
}