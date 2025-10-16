const bcrypt = require('bcrypt')

class Hash {
    constructor(password, salt, hash = null){
        this.password = password
        this.salt = salt
        this.hash = hash;
    }

    async hashPassword() {
        return await bcrypt
            .hash(this.password, this.salt)
            .then((data) => data)
            .catch((err) => console.error(err))
    }

    async dehashPassword() {
        return await bcrypt
            .compare(this.password, this.hash)
            .then((data) => data)
            .catch((err) => console.error(err))
    }
}

module.exports = { Hash }