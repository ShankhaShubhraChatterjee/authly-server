let clientErrors = {
    // Client Side Errors For Account Page
    accountErrors: {
        accountImageUploadError: '',
        accountFnameError: '',
        accountUnameError: '',
        accountEmailError: '',
        accountPcodeError: '',
        accountPcodeMatchError: '',
        accountPcodeUpdateError: '',
        accountUserExists: '',
        accountEmailUsed: ''
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
