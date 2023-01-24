const signOutCurrentUser = async (req, res) => {
    req.session.auth = false
    await req.session.destroy()
    res.redirect('/')
}

module.exports = { signOutCurrentUser }
