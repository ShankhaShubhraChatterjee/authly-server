const { regex } = require('./../src/app/utils/regex')

test('Regex Matches Correctly', () => {
	expect(regex.fname.test("Foster Z")).toBeTruthy()
	expect(regex.uname.test("Foster0123")).toBeTruthy()
	expect(regex.email.test("foster@foster.com")).toBeTruthy()
	expect(regex.pcode.test("Password0123#")).toBeTruthy()
})

test("Regex Fails To Match", () => {
	expect(regex.fname.test("Foster 0123Z")).toBeFalsy()
	expect(regex.uname.test("Foster")).toBeFalsy()
	expect(regex.email.test("fosterster.com")).toBeFalsy()
	expect(regex.pcode.test("passcode0#")).toBeFalsy()
})