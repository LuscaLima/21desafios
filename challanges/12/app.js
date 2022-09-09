const btnToggleMenu = document.querySelector('.toggle')
const btnToggleTheme = document.querySelector('.toggle-theme')
const navbar = document.querySelector('.navbar')
let icon = 'moon'
let theme = 'light'

btnToggleMenu.addEventListener('click', toggleMenu)
btnToggleTheme.addEventListener('click', toggleTheme)

function toggleMenu() {
  navbar.classList.toggle('open')
}

function toggleTheme() {
  theme = theme === 'light' ? 'dark' : 'light'
  icon = theme === 'light' ? 'moon' : 'sun'
  btnToggleTheme.firstElementChild.setAttribute('class', `ph-${icon}`)
  document.documentElement.setAttribute('data-theme', theme)
}
