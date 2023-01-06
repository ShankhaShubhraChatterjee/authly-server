require('dotenv').config()
const { client } = require('./../src/app/utils/db')

let input = "foss0123";

test('Check For Existing User Entry Of Same Username', async () => {
    expect(unameCheck(input)).toBeTruthy()
    expect(unameCheck(input)).toBeFalsy()
    expect(unameCheck(input)).toBeUndefined()
    expect(unameCheck(input)).toBeDefined()
})
