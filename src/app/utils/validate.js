const { client } = require('./db')


function userExistsInDb(username) {
	return client
		.query("SELECT uname FROM users WHERE uname=$1", [username])
		.then(function (data) {
			if (data.rows.length === 0) {
				return false;
			}
			else {
				return true;
			}
		})
		.catch((err) => {
			console.error(err)
		})
}



module.exports = {
    userExistsInDb
}
