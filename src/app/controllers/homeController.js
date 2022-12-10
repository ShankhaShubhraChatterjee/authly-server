// src/app/controllers/homeController.js
const client = require('./../db/db')
const getHomePage = (req, res) => {
    res.render('pages/index.pug')
}

const  postDataFromHome = async (req, res) => {
    const info = req.params.id
    res.sendStatus(200)
    client.query('SELECT * FROM users', (err, data) => {
        if (err) console.log(err)
        else
        {
            console.log(data.rows[0].email)
        }
    })
    console.log(info)
    res.end()
}

module.exports = {
    postDataFromHome,
    getHomePage
};