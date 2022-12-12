const client = require('./../db/db')

const signupPage = (req, res) => {
    res.render('pages/signup.pug')
}

const signupHandle = (req ,res) => {
    let data = req.body;
    console.log(data);
    res.end("200 | status:OK!")
}

module.exports = {
    signupPage,
    signupHandle
}