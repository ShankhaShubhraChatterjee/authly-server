const express = require("express");
const router = express.Router();


router.get("/signup", (req, res) => {
    res.render("pages/register.pug");
})

module.exports = router;