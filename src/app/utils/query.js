var SQL = {
    getAllFromUsername: 'SELECT * FROM users WHERE uname=$1',
    updateUserPassword: 'UPDATE users SET passcode=$1 FROM users WHERE uname=$2',
    getPasswordForUser: 'SELECT passcode FROM users WHERE uname=$1',
    deleteByUsername: 'DELETE FROM users WHERE uname=$1',
    createNewUser: 'INSERT INTO users(fname, uname, email, passcode) VALUES($1, $2, $3, $4)'
}

module.exports = { SQL }
