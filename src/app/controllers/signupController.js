const client = require('./../db/db')

var fnameError ,unameError ,emailError ,pcodeError, userExistsError;
var userExists;

const signupPage = async (req, res) => {
    res.render('pages/signup.pug', {
        fnameError : fnameError,
        unameError: unameError,
        emailError: emailError,
        pcodeError : pcodeError,
        userExistsError: userExistsError
    })
}

const signupHandle = async (req, res) => {
    let fname = req.body.signup_fullname;
    let uname = req.body.signup_username;
    let email = req.body.signup_email;
    let pcode = req.body.signup_password;
    let userValues = [fname, uname, email, pcode];

    let fnameRegex = new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/);
    let unameRegex = new RegExp(/^[a-z0-9_-]{3,16}$/igm);
    let emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    let pcodeRegex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm);

    let validateFname = fnameRegex.test(fname);
    let validateUname = unameRegex.test(uname);
    let validateEmail = emailRegex.test(email);
    let validatePcode = pcodeRegex.test(pcode);
    
    let createUserQuery = "INSERT INTO users(fname, uname, email, passwd) VALUES($1, $2, $3, $4)";

    if(!validateFname){
        console.log("name not valid");
        fnameError = "name not valid";
        res.redirect("/signup");
    }
    else if (!validateUname){
        console.log("username not valid");
        unameError = "username not valid";
        res.redirect("/signup");
    }
    else if (userExists){
        userExistsError = "Username In Use"
        res.redirect("/signup");
    }
    else if (!validateEmail){
        console.log("email not valid");
        emailError = "email not valid";
        res.redirect("/signup");
    }
    else if (!validatePcode){
        console.log("password not valid");
        pcodeError = "password not valid";
        res.redirect("/signup");
    }
    else {
        client.query(createUserQuery, userValues, (err, _) => {
            if(err){
                console.error(err);
            }
            else {
                console.log("User Created");
            }
        });
        console.log(req.session)
        res.redirect("/");
        res.end();
    }
}

module.exports = {
    signupPage,
    signupHandle
}