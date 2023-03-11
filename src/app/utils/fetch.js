const { client } = require('./../utils/db')
const { SQL } = require('./query')

async function fetchProfileImageData(username) {
	return await client
	.query(SQL.getProfileImageData, [username])
	.then((data) => data.rows[0])
}

module.exports = { fetchProfileImageData }