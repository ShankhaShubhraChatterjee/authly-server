const { Hash } = require('./../../src/app/services/hashService')

const dataSet = {
	data: "Password0123#",
	salt: 10
}

const hashService = new Hash(dataSet.data, dataSet.salt, null);

test("Can Hash Data", async () => {
	const hashedData = await hashService.hashInfo()
	hashService.hash = hashedData;
	expect(hashedData).toBeDefined()
})

test("Can Dehash Data", async () => {
	const dehashedData = await hashService.dehashInfo()
	expect(dehashedData).toBeTruthy()
})