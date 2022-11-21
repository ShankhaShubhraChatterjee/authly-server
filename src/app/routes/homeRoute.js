require('dotenv').config()
const express = require('express')
const client = require('./../db/db')
const router = express.Router()
const regex = new RegExp()
router.get('/', (req, res) => {
    res.render('index.pug')
})
router.post('/:id', async (req, res) => {
    const info = req.params.id
    res.sendStatus(200)
    client.query('SELECT * FROM users', (err, data) => {
        if (err) console.log(err)
        else {
            console.log(data.rows[0].email)
        }
    })
    console.log(info)
    res.end()
})
module.exports = router
