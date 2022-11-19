const express = require("express");
const router = express.Router();


router.get("/login", (req, res) => {
    res.render("pages/login.pug");
})

module.exports = router;