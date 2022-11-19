require("dotenv").config();
const express = require('express');
const router = express.Router();
const { Client } = require('pg');

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

router.get("/", async (req, res) => {
    await client.connect();
    client.query("SELECT * FROM users", (err, data) => {
        if(err){
            console.log(err)
        }
        else {
            console.log("Data Fetched")
            res.render("index.pug", {name:data.rows[0].name, age: data.rows[0].age});
        }
    })
    client.end();
});

module.exports = router;