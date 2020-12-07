const app = document.querySelector('.app')
const nav = document.querySelector('.b-nav')
const navToggle = document.querySelector('.b-navToggle')

if (nav && navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.getAttribute('data-state').toLowerCase() === 'open'
    if (isOpen) closeNav()
    else openNav()
  })
}

// close mobile navigation on barba navigation
document.addEventListener('barbaInit', e => {
  e.detail.hooks.afterLeave(closeNav)
}, { once: true })

/**
 * openNav
 *
 * opens navigation
 */
function openNav() {
  app.scrollTo(0, 0)
  app.style.overflow = 'hidden'
  nav.setAttribute('data-state', 'open')
  navToggle.classList.add('is-active')
  navToggle.setAttribute('aria-expanded', 'true')
  nav.focus()
}

/**
 * closeNav
 *
 * closes navigation
 */
function closeNav() {
  app.style.overflow = null
  nav.setAttribute('data-state', 'closed')
  navToggle.classList.remove('is-active')
  navToggle.setAttribute('aria-expanded', 'false')
  navToggle.focus()
}
