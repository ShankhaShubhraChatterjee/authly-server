require('dotenv').config()
const { client } = require('../src/app/utils/db')
const signin = require('./../src/app/controllers/signinController');
const signup = require('./../src/app/controllers/signupController');

// test Database Query 
test('Query Username', () => {
    client.query(`SELECT * FROM users`, (err, data) => {
        if (err) {
            console.error(err)
        } else {
            JSON.stringify(data)
        }
        expect(data.rows).toBeDefined()

        client.end();
    })
})