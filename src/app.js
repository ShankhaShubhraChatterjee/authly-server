require('dotenv').config();
const path 	    = require('path');
const express   = require('express');
const app       = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, process.env.VIEWS_DIR));
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(express.static(process.env.STATIC_DIR))
app.get("/", (req, res) => {
    res.render(`index.pug`)
})

app.listen(process.env.APP_PORT, () => {
    console.log(`Server Running On ${process.env.APP_URL}:${process.env.APP_PORT}`);
})