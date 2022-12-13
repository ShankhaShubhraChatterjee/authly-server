const menu = document.getElementById("burger");
const list = document.getElementById("nav-links");

const signupFname = document.getElementById("signup-fname")
const signupUname = document.getElementById("signup-uname")
const signupEmail = document.getElementById("signup-email")

const signinEmail = document.getElementById("signin-email")

const signupSubmit = document.getElementById('signup-submit')

signupSubmit.addEventListener('click', () => {
    localStorage.setItem("signup-fname", signupFname.value);
    localStorage.setItem("signup-uname", signupUname.value);
    localStorage.setItem("signup-email", signupEmail.value);
    // localStorage.setItem("signup-fname", signupFname.value);
    console.log("Click Executed")
})

window.addEventListener("load", () => {
    signupFname.value = localStorage.getItem("signup-fname");
    signupUname.value = localStorage.getItem("signup-uname");
    signupEmail.value = localStorage.getItem("signup-email");
})
setTimeout(() => {
    localStorage.removeItem("signup-fname");
    localStorage.removeItem("signup-uname");
    localStorage.removeItem("signup-email");
}, 3 * 1000 * 100);
menu.addEventListener('click', () => {
    if(menu.classList.contains('is-active'))
    {
        menu.classList.remove('is-active');
        list.classList.remove('is-active');
    }
    else
    {
        menu.classList.add('is-active');
        list.classList.add('is-active');
    }
})