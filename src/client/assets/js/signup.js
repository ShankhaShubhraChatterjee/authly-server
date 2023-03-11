const signupFname = document.getElementById('signup-fname')
const signupUname = document.getElementById('signup-uname')
const signupEmail = document.getElementById('signup-email')

const signupSubmit = document.getElementById('signup-submit')
const signupEye = document.getElementById('signup-eye')
const pcode = document.getElementsByClassName('password-field')[0]

const storeRegisterInputValues = () => {
    localStorage.setItem('signup-fname', signupFname.value)
    localStorage.setItem('signup-uname', signupUname.value)
    localStorage.setItem('signup-email', signupEmail.value)
    console.log('Click Executed')
}
const restoreRegisterInputValues = () => {
    signupFname.value = localStorage.getItem('signup-fname')
    signupUname.value = localStorage.getItem('signup-uname')
    signupEmail.value = localStorage.getItem('signup-email')
}
const clearRegisterInputValues = () => {
    localStorage.setItem('signup-fname', '')
    localStorage.setItem('signup-uname', '')
    localStorage.setItem('signup-email', '')
}
const showHidePassword = () => {
    if (pcode.type === 'password') {
        signupEye.className = 'eye-icon fas fa-eye-slash'
        pcode.type = 'text'
    } else {
        signupEye.className = 'eye-icon fas fa-eye'
        pcode.type = 'password'
    }
}
signupSubmit.addEventListener('click', storeRegisterInputValues)
signupEye.addEventListener('click', showHidePassword)
window.addEventListener('load', restoreRegisterInputValues)
setTimeout(clearRegisterInputValues, 300000)