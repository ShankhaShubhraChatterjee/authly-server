require('dotenv').config()
const { client } = require("./../src/app/utils/db")
const { SQL } = require("./../src/app/utils/query")
const { inputFieldEmpty, updateAccountDetails } = require('./../src/app/utils/validate')

test("Contains Empty Value", () => {
	let input = ["", "Something Z", null, undefined];

	expect(inputFieldEmpty(input[0])).toBeFalsy()
	expect(inputFieldEmpty(input[1])).toBeTruthy()
	expect(inputFieldEmpty(input[2])).toBeFalsy()
	expect(inputFieldEmpty(input[3])).toBeFalsy()
})

test("Update Function Works", async () => {
	await expect(updateAccountDetails(SQL.getUsername, ["something0123"])).toBeTruthy();
	client.end()
})
