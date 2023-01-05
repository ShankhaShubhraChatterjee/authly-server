require('dotenv').config()
const { client } = require('../src/app/utils/db')
const signin = require('./../src/app/controllers/signinController');
const signup = require('./../src/app/controllers/signupController');

let username = "moss0123";

// test Database Query 
test('Query Username', async () => {
    client.query(`SELECT * FROM users WHERE uname=$1;`,[username], (err, data) => {
        if (err) {
            console.error(err)
        }
        else {
            if(data.rows.length === 0){
                expect(data.rows).toBe("")
            }
            else {
                expect(data.rows[0].uname).toBe(username)
            }
        }
        
        client.end();
    })
})