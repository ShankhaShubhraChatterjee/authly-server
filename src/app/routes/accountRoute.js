require("dotenv").config();
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

router.get("/", (req, res) => {
    res.render("pages/account.pug");
})

module.exports = router;