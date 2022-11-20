const themeBtn = document.getElementById("theme-icon");
const menu = document.getElementById("menu");
const navbar = document.getElementById("navbar");

themeBtn.addEventListener('click', () => {
    if(themeBtn.className === "bi bi-moon"){
        themeBtn.className = "bi bi-sun";
    }
    else {
        themeBtn.className = "bi bi-moon";
    }
    themeBtn.classList.add("animate");
    setTimeout(() => {
        themeBtn.classList.remove("animate");
    }, 300);
    console.log("Working");
});
menu.addEventListener('click', () => {
        navbar.classList.toggle('display');
        if(navbar.classList.contains('display')){
            setTimeout(() => {
                navbar.style.display = "none";
                navbar.style.height = "0px";
            }, 200);
        }
        else {
            setTimeout(() => {
                navbar.style.display = "flex";
                navbar.style.height = "auto";
            }, 200);
        }
})
window.addEventListener("resize", () => {
    if(window.innerWidth > 600) {
        navbar.classList.remove("display");
        navbar.style.display = "flex";
        navbar.style.height = "auto";
    }
    else {
    }
})