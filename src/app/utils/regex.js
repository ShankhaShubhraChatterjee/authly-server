var regex = {
    fname : new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/),
    uname : new RegExp(/^[a-z0-9_-]{3,16}$/igm),
    email : new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
    pcode : new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
}

module.exports = regex;