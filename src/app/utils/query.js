var SQL = {
    getAllFromUsername: 'SELECT * FROM users WHERE uname=$1',
    
    updateUserPassword: 'UPDATE users SET passcode=$1 FROM users WHERE uname=$2',
    
    updateFullname: 'UPDATE users SET fname=$1 WHERE uname=$2',

    getPasswordForUser: 'SELECT passcode FROM users WHERE uname=$1',
    
    deleteByUsername: 'DELETE FROM users WHERE uname=$1',
    
    createNewUser: 'INSERT INTO users(fname, uname, email, passcode) VALUES($1, $2, $3, $4)',
    
    getUserEmail: 'SELECT email FROM users WHERE email=$1',
    
    getUsername: 'SELECT uname FROM users WHERE uname=$1'
}

module.exports = { SQL }
