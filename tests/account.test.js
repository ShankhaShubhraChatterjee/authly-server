require('dotenv').config()
const { client } = require('../src/app/utils/db')
const { SQL} = require('../src/app/utils/query')
const { matchCurrentPassword } = require('./../src/app/utils/validate')


test('Check If Old Password Matches', async () => {
    let pcode = await matchCurrentPassword("random", ["foster0123"])
    await expect(pcode).toBeTruthy()
})

// test('User Can Update Password', async () => {})
// test('User Can Update Username', async () => {})
// test('User Can Update Name', async () => {})
// test('User Can Update Email', async () => {})
// test('User Access Is Forbidden After Session Expires', async () => {})