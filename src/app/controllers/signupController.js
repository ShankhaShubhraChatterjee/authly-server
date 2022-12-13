const client = require('./../db/db')

var error = "";

const signupPage = async (req, res) => {
    res.render('pages/signup.pug', {error : error})
}

const signupHandle = (req ,res) => {
    let fname = req.body.signup_fullname;
    let uname = req.body.signup_username;
    let email = req.body.signup_email;
    let pcode = req.body.signup_password;

    let fnameRegex = new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/);

    let unameRegex = new RegExp(/^[a-z0-9_-]{3,16}$/igm);

    let emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);

    let pcodeRegex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm);

    let validateFname = fnameRegex.test(fname);
    let validateUname = unameRegex.test(uname);
    let validateEmail = emailRegex.test(email);
    let validatePcode = pcodeRegex.test(pcode);

    let createUserQuery = "INSERT INTO users(fname, uname, email, passwd) VALUES($1, $2, $3, $4)";

    let userValues = [fname, uname, email, pcode];
    if(!validateFname){
        console.log("name not valid");
        error = "name not valid";
    }
    else if (!validateUname && !unameIsUnique){
        console.log("username not valid");
    }
    else if (!validateEmail){
        console.log("email not valid");
    }
    else if (!validatePcode){
        console.log("password not valid");
    }
    else {
        client.query(createUserQuery, userValues, (err, data) => {
            if(err){
                console.error(err);
            }
            else {
                console.log(data);
            }
        });
        res.redirect("/");
        res.end();
    }
}

module.exports = {
    signupPage,
    signupHandle
}