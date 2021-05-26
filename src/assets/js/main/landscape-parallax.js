const container = document.querySelector('.app')
const elements = document.querySelectorAll('[data-parallax]')

function animation() {
  const scrollPos = container.scrollTop + 'px'
  elements.forEach(el => {
    el.style.setProperty('--scrollPos', scrollPos)
  })
  window.requestAnimationFrame(animation)
}

window.requestAnimationFrame(animation)
