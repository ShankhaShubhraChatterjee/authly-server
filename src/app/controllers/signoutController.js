const { client } = require('./../utils/db')
const { SQL } = require('./../utils/query')
const signOutCurrentUser = async (req, res) => {
    req.session.auth = false
    await req.session.destroy()
    res.redirect('/')
}

const deleteAccount = async (req, res) => {
    client.query(SQL.deleteByUsername, [req.session.user.uname])
        .then(async () => {
            req.session.auth = false
            await req.session.destroy()
            await res.redirect("/")
        })
        .catch((err) => {
            console.error(err)
        })
}

module.exports = { signOutCurrentUser, deleteAccount }
