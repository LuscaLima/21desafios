let theme = 'light'
let icon = 'moon'
const btnToggleTheme = document.querySelector('.toggle-theme')

btnToggleTheme.addEventListener('click', toggleTheme)

function toggleTheme() {
  theme = theme === 'light' ? 'dark' : 'light'
  icon = theme === 'light' ? 'moon' : 'sun'
  btnToggleTheme.firstElementChild.setAttribute('class', `ph-${icon}`)
  document.documentElement.setAttribute('data-theme', theme)
}
