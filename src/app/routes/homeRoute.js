require("dotenv").config();
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index.pug");
});
router.post("/:id",async (req ,res) => {
    const data = req.body.num;
    res.sendStatus(200);
    console.log(data);
    res.end();
})
module.exports = router;