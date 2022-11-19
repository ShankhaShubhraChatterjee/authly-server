require("dotenv").config();
const path 	  = require('path');
const express = require('express');
const app = express();
const { Client } = require("pg");

// Routes
const homeRoute = require("./app/routes/homeRoute.js");
const loginRoute = require("./app/routes/loginRoute.js");
const signupRoute = require("./app/routes/signupRoute.js");

app.set("view engine", "pug");
app.set("views", path.join(__dirname, process.env.VIEWS_DIR));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, process.env.STATIC_DIR)));
app.use((req, res, next) => {
    console.log(`Method:${req.method}|Url:${req.url}`);
    next();
})

app.get("/", homeRoute);
app.get("/login", loginRoute);
app.get("/signup", signupRoute);

app.listen(process.env.APP_PORT, () => {
    const client = new Client({
        user: process.env.DB_USER,
        host:process.env.DB_HOST,
        database:process.env.DB_NAME,
        password:process.env.DB_PASSWORD,
        port:process.env.DB_PORT,
    })
    client.connect()

    client.query('SELECT * FROM users', (err, res) => {
        if (err) console.log(err);
        else console.log("Connected To Database Successfully");
        client.end();
    })
    console.log(`$Server Running On ${process.env.APP_URL}:${process.env.APP_PORT}`);
})