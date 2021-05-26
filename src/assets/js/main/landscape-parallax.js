const root = document.documentElement

const elements = document.querySelectorAll('[data-parallax]')

function getScrollTop() {
  return (document.scrollingElement || document.documentElement).scrollTop
}

function animation() {
  elements.forEach(el => {
    el.style.setProperty('--scrollPos', getScrollTop()  + 'px')
  })
  window.requestAnimationFrame(animation)
}

window.requestAnimationFrame(animation)
