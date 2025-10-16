const { User } = require('../../src/services/userService')
const { Hash } = require('../../src/services/hashService')
const { regex } = require('../../src/services/regex/regex')


const dataSet0 = ["Foster Z", "Foster0123", "test@test.com", "Password0123#"]

const dataSet1 = ["Foster Z0123", "Foster0123", "test@test.com", "Password0123#"]

const dataSet2 = ["Foster Z", "Foste#$$r0123", "test@test.com", "Password0123#"]

const dataSet3 = ["Foster Z", "Foster0123", "testtest.c", "Password0123#"]

const dataSet4 = ["Foster Z", "Foster0123", "test@test.com", "passwrd0123"]

const dataSet5 = ["Foster Z23", "Foste#$%^r0123", "test@4t#$$est.com", "password&*&"]


test("User Is Successfully Created", () => {
	const hash = new Hash(dataSet0[3], 10).hashInfo();
	const user = new User(dataSet0[0], dataSet0[1], dataSet0[2], hash)
	expect(user.createUser(hash)).toBeTruthy()
})

test("User Is Not Created Due To Name Error", () => {
	const hash = new Hash(dataSet1[3], 10).hashInfo();
	const user = new User(dataSet1[0], dataSet1[1], dataSet1[2], hash)
	expect(user.validate(dataSet1[0], regex.fname)).toBeFalsy()
})

test("User Is Not Created Due To Username Error", () => {
	const hash = new Hash(dataSet2[3], 10).hashInfo();
	const user = new User(dataSet2[0], dataSet2[1], dataSet2[2], hash)
	expect(user.validate(dataSet1[0], regex.fname)).toBeFalsy()
})

test("User Is Not Created Due To Email Error", () => {
	const hash = new Hash(dataSet3[3], 10).hashInfo();
	const user = new User(dataSet3[0], dataSet3[1], dataSet3[2], hash)
	expect(user.createUser(hash)).toBeTruthy()
})

test("User Is Not Created Due To Password Error", () => {
	const hash = new Hash(dataSet4[3], 10).hashInfo();
	const user = new User(dataSet4[0], dataSet4[1], dataSet4[2], hash)
	expect(user.validate()).toBeTruthy()
})

test("User Is Not Created Due To Password Matching Error", () => {
	const hash = new Hash(dataSet5[3], 10).hashInfo();
	const user = new User(dataSet5[0], dataSet5[1], dataSet5[2], hash)
	expect(user.validate()).toBeTruthy()
})

test("User Is Not Created Due To Many Errors", () => {
	const hash = new Hash(dataSet4[3], 10).hashInfo();
	const user = new User(dataSet4[0], dataSet4[1], dataSet4[2], hash)
	expect(user.createUser(hash)).toBeTruthy()
})
