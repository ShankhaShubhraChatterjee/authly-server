const bcrypt = require('bcrypt')
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

async function matchCurrentPassword(password, username) {
   return await client
      .query(SQL.getPasswordForUser, username)
      .then(async (data) => {
         let hash = await data.rows[0];
         return await bcrypt
            .compare(password, hash.passcode)
            .then((result) => result)
            .catch((err) => console.error(err))
      })
}
function validateInputsWithRegex(regex) {
   return regex
}
module.exports = {
   userExistsInDb,
   inputFieldEmpty,
   emailInUse,
   matchCurrentPassword,
   validateInputsWithRegex
}