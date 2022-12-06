const themeBtn = document.getElementById('theme-icon')
const menu = document.getElementById('menu')
const navbar = document.getElementById('navbar')

themeBtn.addEventListener('click', () => {
  if (themeBtn.className === 'bi bi-moon') {
    themeBtn.className = 'bi bi-sun'
  } else {
    themeBtn.className = 'bi bi-moon'
  }
  themeBtn.classList.add('animate')
  setTimeout(() => {
    themeBtn.classList.remove('animate')
  }, 300)
  console.log('Working')
})
menu.addEventListener('click', () => {
    navbar.classList.toggle('display')
    if(navbar.classList.contains('display')){
      setTimeout(() => {
        navbar.style.height = "0";
      }, 200);
    }
    else {
      setTimeout(() => {
        navbar.style.height = "auto";
      }, 200);
    }
})