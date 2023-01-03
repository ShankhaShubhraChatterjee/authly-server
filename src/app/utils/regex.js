var regex = {
    fname : new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/),
    uname : new RegExp(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[a-zA-Z]).{5,20}$/mi),
    email : new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
    pcode : new RegExp(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*])(?=.*[a-zA-Z]).{8,16}$/gm)
}

module.exports = regex;