// src/app/controllers/homeController.js
const {client} = require('../utils/db')
const getHomePage = async (req, res) => {
    res.render('pages/index.pug')
}
module.exports = {
    getHomePage
};