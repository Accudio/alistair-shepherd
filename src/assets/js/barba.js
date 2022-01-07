import barba from '@barba/core'
import prefetch from '@barba/prefetch'
import OnDemandLiveRegion from 'on-demand-live-region'

window.barba = barba

// initialise
window.barba.use(prefetch)
window.barba.init({
  prevent: ({ el }) => {
    if (el.getAttribute('href').endsWith('.xml')) return true
    return false
  }
})

// set up live region to be used for page navigation announcements
const liveRegion = new OnDemandLiveRegion()

// fire initialisation event
var event = new CustomEvent('barbaInit', { detail: barba })
document.dispatchEvent(event)

// accessibility tweaks
let currentPath
const scrollEl = document.querySelector('.app')
const page = document.querySelector('#page')
window.barba.hooks.afterEnter(({ trigger }) => {
  // focus page
  page.focus()

  // announce new page to screen readers
  liveRegion.say(`Navigated to: ${document.title}`)

  // attempt to restore scroll on back/forward
  restoreScroll(trigger)
  currentPath = location.pathname
})

// save scroll position in sessionstorage
window.barba.hooks.beforeLeave(() => {
  sessionStorage.setItem(`scroll-${currentPath}`, scrollEl.scrollTop)
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

// if this navigation was by back forward, try and restore previous scroll position otherwise scroll to top
function restoreScroll(trigger) {
  if (trigger === 'back' || trigger === 'forward') {
    const scrollPos = sessionStorage.getItem(`scroll-${location.pathname}`)
    if (scrollPos) {
      scrollEl.scrollTo(0, scrollPos)
      return
    }
  }

  scrollEl.scrollTo(0, 0)
}
