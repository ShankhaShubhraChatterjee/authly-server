const menu = document.getElementById('burger')
const list = document.getElementById('nav-links')

menu.addEventListener('click', () => {
    if (menu.classList.contains('is-active')) {
        menu.classList.remove('is-active')
        list.classList.remove('is-active')
    } else {
        menu.classList.add('is-active')
        list.classList.add('is-active')
    }
})
