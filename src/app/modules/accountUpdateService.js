const { client } = require("../utils/db")

const updateUserDetails = async (query, params, input, regex, isEmpty, error, errorMsg) => {
	if (!isEmpty) {
		if (input.length > 0 && regex.test(input)) {
			await client
				.query(query, params)
				.then(() => { return true })
				.catch((err) => { console.error(err)})
		}
		if (!regex.fname.test(updates.fname)) {
			clientErrors.accountFnameError = "Invalid name"
		}
	}
	else {
		error = errorMsg;
		res.redirect("/account")
		res.end()
	}
}	

module.exports = { updateUserDetails }