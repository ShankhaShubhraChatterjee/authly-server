require('dotenv').config()
const { hashPassword } = require('../src/app/utils/hash')
const { regex } = require('../src/app/utils/regex')
const { client } = require("./../src/app/utils/db")
const { SQL } = require("./../src/app/utils/query")
const { inputFieldEmpty, updateAccountDetails, validateInputsWithRegex } = require('./../src/app/utils/validate')

// test("Contains Empty Value", () => {
// 	let input = ["", "Something Z", null, undefined];

// 	expect(inputFieldEmpty(input[0])).toBeFalsy()
// 	expect(inputFieldEmpty(input[1])).toBeTruthy()
// 	expect(inputFieldEmpty(input[2])).toBeFalsy()
// 	expect(inputFieldEmpty(input[3])).toBeFalsy()
// })

// test("Update Function Works", async () => {
// 	await expect(updateAccountDetails(SQL.getUsername, ["something0123"])).toBeTruthy();
// 	client.end()
// })

// test("CHeck Regex Testing Functin", () => {
// 	expect(validateInputsWithRegex(regex.uname.test("Foster Z"))).toBeFalsy()
// })

test("Check If Hash Is Working", async () => {
	let data = await hashPassword("Password0123$", 10);
	console.log(data)
	expect(data).toBeDefined();
})

// test("Check Input Length Checker Function", () => {
// 	let val = "a";
// 	expect(inputFieldEmpty(val)).toBeFalsy()
// })
