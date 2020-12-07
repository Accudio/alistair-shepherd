import barba from '@barba/core'
import prefetch from '@barba/prefetch'

window.barba = barba

// initialise
window.barba.use(prefetch)
window.barba.init({
  prevent: ({ el }) => el.hasAttribute('data-lightbox')
})

// fire initialisation event
var event = new CustomEvent('barbaInit', { detail: barba })
document.dispatchEvent(event)

// scroll to top
const scrollEl = document.querySelector('.app')
window.barba.hooks.leave(() => {
  scrollEl.scrollTo(0, 0)
})

// update active nav
window.barba.hooks.afterLeave(() => {
  // remove aria-current from all items
  const links = document.querySelectorAll('.b-nav__link')
  if (links) {
    links.forEach(el => {
      el.removeAttribute('aria-current')
    })
  }

  // add aria-current to item if href matches pathname
  const current = document.querySelector(`.b-nav__link[href="${window.location.pathname}"]`)
  if (current) current.setAttribute('aria-current', 'page')
})
