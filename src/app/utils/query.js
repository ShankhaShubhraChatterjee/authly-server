var queries = {
    checkForUname : 'SELECT uname FROM users WHERE uname=',
    checkForUser: 'SELECT uname, passcode FROM users WHERE uname=',
    checkForPcode : 'SELECT passcode FROM users',
    createUserQuery : 'INSERT INTO users(fname, uname, email, passwd) VALUES($1, $2, $3, $4)'
}

module.exports = queries;