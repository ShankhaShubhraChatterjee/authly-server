const username = document.getElementById("username")
const loginEye = document.getElementById('login-eye')
const pcode = document.getElementsByClassName('password-field')[0]
const loginButton = document.getElementById("login")

const showHidePassword = () => {
    if (pcode.type === 'password') {
        loginEye.className = 'eye-icon fas fa-eye-slash'
        pcode.type = 'text'
    } else {
        loginEye.className = 'eye-icon fas fa-eye'
        pcode.type = 'password'
    }
}
loginButton.addEventListener("click", () => {
    localStorage.setItem("signin_username", username.value)
})
window.addEventListener("load", () => {
    username.value = localStorage.getItem("signin_username")
})
loginEye.addEventListener('click', showHidePassword)