let clientErrors = {
    // Client Side Errors For Account Page
    accountErrors: {
        accountImageUploadError: '',
        accountFnameError: '',
        accountUnameError: '',
        accountEmailError: '',
        accountCurrentPasswordError: '',
        accountNewPasswordError: '',
        accountConfirmPasswordError: '',
        accountUserExists: '',
        accountEmailUsed: '',
        passwordMatch: '',
        wrongPassword: '',
    },

    // Client Side Errors For SignIn Page
    signinErrors: {},
    signinUserExists: '',
    signinPasswordOk: '',

    // Client Side Errors For SignUp Page
    signupErrors: {},
    resetErrors: {
        newPassword: '',
        confirmPassword: '',
        passwordsMatches: '',
        emailExists: '',
    },
    signUpEmailInUse: '',
    signUpUserExists: '',
}

module.exports = { clientErrors }
