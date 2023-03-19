const menu = document.getElementById('burger')
const list = document.getElementById('nav-links')

const handleNavbar = () => {
    if (menu.classList.contains('is-active')) {
        menu.classList.remove('is-active')
        list.classList.remove('is-active')
    } else {
        menu.classList.add('is-active')
        list.classList.add('is-active')
    }
}
menu.addEventListener('click', handleNavbar)
