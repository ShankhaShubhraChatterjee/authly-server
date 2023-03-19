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

    // Client Side Errors For SignUp Page
    signupErrors: {},
    signUpEmailInUse: '',
    signUpUserExists: '',
}

module.exports = { clientErrors }
