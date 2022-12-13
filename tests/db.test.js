require('dotenv').config()
const client = require('./../src/app/db/db')

// test Database Query 
test('Query Username', async () => {
    client.query(`SELECT * FROM users`, (err, data) => {
        if (err) {
            console.error(err)
        } else {
            JSON.stringify(data)
        }
        expect(data.rows[0].uname).toBe('freezer0123')

        client.end();
    })
})


