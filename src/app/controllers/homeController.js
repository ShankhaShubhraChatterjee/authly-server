// src/app/controllers/homeController.js
const { client } = require('../utils/db')

const getHomePage = async (req, res) => {
    setTimeout(() => {
        req.session.notifyLogOut = false;
    }, 3000)
    res.render('pages/index.pug', { notify: req.session.notifyLogOut })
}
module.exports = {
    getHomePage,
}
