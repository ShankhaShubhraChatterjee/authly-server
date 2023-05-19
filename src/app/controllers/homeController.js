// src/app/controllers/homeController.js

const getHomePage = async (req, res) => {
    res.render('pages/index.pug', {
        user: req.session.user,
        auth: req.session.auth
    })
}

module.exports = { getHomePage }