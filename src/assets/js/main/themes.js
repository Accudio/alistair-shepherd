const themes = document.querySelector('.b-themes')
const themeList = document.querySelector('.b-themes__list')
const themeToggle = document.querySelector('#themes')
const landscape = document.querySelector('.b-landscape')

if (themes && themeToggle) {
  const themeHeight = themeList.offsetHeight
  themes.style.setProperty('--theme-height', themeHeight + 'px')

  themeToggle.addEventListener('click', () => {
    const isOpen = themes.getAttribute('data-expand').toLowerCase() !== 'false'
    if (isOpen) {
      themeToggle.setAttribute('aria-expanded', 'false')
      themes.setAttribute('data-expand', 'false')
      landscape.setAttribute('data-themes', 'false')
      themeToggle.focus()
    } else {
      themeToggle.setAttribute('aria-expanded', 'true')
      themes.setAttribute('data-expand', 'true')
      landscape.setAttribute('data-themes', 'true')
      themes.focus()
    }
  })
}
