require('dotenv').config()
const { client } = require('../src/app/utils/db')
const signin = require('./../src/app/controllers/signinController');
const signup = require('./../src/app/controllers/signupController');

let username = "foss0123";

// test Database Query 
test('Query Username', async () => {
    client.query(`SELECT uname FROM users WHERE uname='${username}';`, (err, data) => {
        if (err) {
            console.error(err)
        }
        expect(data.rows[0].uname).toBe(username)
        client.end();
    })
})