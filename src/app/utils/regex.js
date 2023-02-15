const regex = {
    fname: new RegExp(/^[A-Za-z]+( [A-Za-z]+)*$/),
    uname: new RegExp(/^(?!\.)(([a-zA-Z]{1,10}[0-9]{1,10}))+\s*$/),
    email: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i),
    pcode: new RegExp(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*])(?=.*[a-zA-Z]).{8,16}$/)
}

const accountRegex = {
    fname: new RegExp(/^$|^[A-Za-z]+( [A-Za-z]+)*$/),
    uname: new RegExp(/^$|^(?!\.)(([a-zA-Z]{1,10}[0-9]{1,10}))+\s*$/),
    email: new RegExp(/^$|^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i),
    pcode: new RegExp(/^$|^(?=.*\d)(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*[-\#\$\.\%\&\*])(?=.*[a-zA-Z]).{8,16}$/)
}

module.exports = { regex, accountRegex }