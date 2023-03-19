const { client } = require('./../utils/db')
const { SQL } = require('./../utils/query')

const { imageKit } = require('./../utils/imagekit')

const signOutCurrentUser = (req, res) => {
    req.session.auth = false
    req.session.destroy()
    res.redirect('/')
}

const deleteAccount = async (req, res) => {
    await client
        .query(SQL.deleteByUsername, [req.session.user.uname])
        .then(() => {
            if (req.session.auth) {
                req.session.destroy()
                res.redirect('/')
            } else {
                console.log('error')
                res.redirect('/account')
            }
        })
        .catch((err) => {
            console.error(err)
        })
}

module.exports = { signOutCurrentUser, deleteAccount }
