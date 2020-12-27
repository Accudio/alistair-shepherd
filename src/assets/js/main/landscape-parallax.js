const container = document.querySelector('.app')
const root = document.documentElement

let scrollPos

function animation() {
  if (scrollPos !== container.scrollTop) {
    scrollPos = container.scrollTop
    root.style.setProperty('--scrollPos', scrollPos + 'px')
  }

  window.requestAnimationFrame(animation)
}

window.requestAnimationFrame(animation)
