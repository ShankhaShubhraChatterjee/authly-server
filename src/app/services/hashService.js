const bcrypt = require('bcrypt')

class Hash {
    constructor(detail, salt, hash = null){
        this.detail = detail
        this.salt = salt
        this.hash = hash
    }

    async hashInfo() {
        return await bcrypt
            .hash(this.detail, this.salt)
            .then((data) => data)
            .catch((err) => console.error(err))
    }

    async dehashInfo() {
        return await bcrypt
            .compare(this.detail, this.hash)
            .then((data) => data)
            .catch((err) => console.error(err))
    }
}

module.exports = { Hash }