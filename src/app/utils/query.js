var SQL = {
    createNewUser:
        'INSERT INTO users(fname, uname, email, passcode) VALUES($1, $2, $3, $4)',

    getName: 'SELECT fname FROM users WHERE uname=$1',

    getUsername: 'SELECT uname FROM users WHERE uname=$1',

    getUserEmail: 'SELECT email FROM users WHERE email=$1',

    getPasswordForUser: 'SELECT passcode FROM users WHERE uname=$1',

    getAllFromUsername: 'SELECT * FROM users WHERE uname=$1',

    getProfileImageData:
        'SELECT profile_image, profile_image_id FROM users WHERE uname=$1',

    updateFullname: 'UPDATE users SET fname=$1 WHERE uname=$2',

    updateUsername: 'UPDATE users SET uname=$1 WHERE uname=$2',

    updateEmail: 'UPDATE users SET email=$1 WHERE uname=$2',

    updateUserPassword: 'UPDATE users SET passcode=$1 WHERE email=$2',

    modifyProfileImage:
        'UPDATE users SET profile_image=$1, profile_image_id=$2 WHERE uname=$3',

    deleteByUsername: 'DELETE FROM users WHERE uname=$1',
}

module.exports = { SQL }
