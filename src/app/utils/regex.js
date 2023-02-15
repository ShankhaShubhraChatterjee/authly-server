let regex = {
    fname: new RegExp(/^[A-Za-z]+( [A-Za-z]+)*$/),
    uname: new RegExp(/^(?!\.)(([a-zA-Z]{1,10}[0-9]{1,10}))+\s*$/),
    email: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i),
    pcode: new RegExp(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*])(?=.*[a-zA-Z]).{8,16}$/)
}

let accountRegex = {
    fname: new RegExp(/^$|^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/),
    uname: new RegExp(/^$|^(?=.*\d)(?=.*[a-zA-Z])(?=.*[a-zA-Z]).{5,20}$/im),
    email: new RegExp(/^$|^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
    pcode: new RegExp(/^$|^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*])(?=.*[a-zA-Z]).{8,16}$/m)
}

module.exports = { regex, accountRegex }