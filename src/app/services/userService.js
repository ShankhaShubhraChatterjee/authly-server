const { client } = require('./../utils/db');

class User {

    constructor(fullname, username, email, password, confirmPassword = null){
        this.fullname = fullname
        this.username = username
        this.email = email
        this.password = password
        this.confirmPassword = confirmPassword
    }

    validate = (param, regex) => new RegExp(regex).test(param) ? true : false

    matchPassword = () => this.password === this.confirmPassword ? true : false

   	async updateData (query, key, value) {
   		await client
   				.query(query, [key, value])
   				.then((data) => console.log("Updated " + key))
   				.catch((err) => console.error(err))
   	} 

    async updateData (query, key1, key2, value) {
        await client
                .query(query, [key1, key2, value])
                .then((data) => console.log("Updated " + key1 + " & " + key2))
                .catch((err) => console.error(err))
    } 

    async createUser (password){
        await client
                .query(SQL.createUser, [this.fullname, this.username, this.email, password])
                .then((data) => console.log("Created New User"))
                .catch((err) => console.error(err))
    }

    async deleteUser (username) {
        await client
                .query(SQL.deleteByUsername, [username])
                .then((data) => console.log("Deleted User"))
                .catch((err) => console.error(err))
    }
}
module.exports = { User }