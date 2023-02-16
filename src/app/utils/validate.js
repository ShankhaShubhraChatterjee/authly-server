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

function inputFieldEmpty(input) { return input ? false : true }

async function updateAccountDetails(query, params) {
   await client
      .query(query, params)
      .then(() => true )
      .catch((err) => { console.error(err); return false })
}

module.exports = {
   userExistsInDb,
   inputFieldEmpty,
   emailInUse,
   updateAccountDetails
}