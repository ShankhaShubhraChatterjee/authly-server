// src/app/controllers/homeController.js
const {client} = require('../utils/db')
const getHomePage = (req, res) => {
    console.log(req.session.auth)
    res.render('pages/index.pug')
}
module.exports = {
    getHomePage
};