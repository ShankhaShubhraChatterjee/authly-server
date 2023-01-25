require('dotenv').config()
const { client } = require('../src/app/utils/db')
const { SQL} = require('../src/app/utils/query')
const { matchPasswordFromDB } = require('../src/app/modules/comparePassword')

test('Check If Password Exists For The Username', async () => {
    const result = await matchPasswordFromDB(SQL.getPassword, ["fossy0123"], "Password0123#")
    expect(result).toBeUndefined();
    client.end();
})
