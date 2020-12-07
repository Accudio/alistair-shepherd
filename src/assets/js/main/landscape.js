import config from './landscape-config'

const root = document.documentElement
const interval = config.debug ? 100 : 60000

// add first element of states to end for looping
config.states.push({
  ...config.states[0],
  name: 'end',
  at: 24
})

// animation
let animation
function startAnim() {
  updateProps()
  animation = setInterval(updateProps, interval)
}
function endAnim() {
  clearInterval(animation)
}

// set colour
function updateProps() {
  const progress = getProgress() * 24

  const endIndex = config.states.findIndex(frame => {
    return frame.at !== 0 && progress < frame.at
  })
  const startIndex = endIndex - 1

  const start = config.states[startIndex]
  const end = config.states[endIndex]

  const diff = end.at - start.at
  const progressCurr = (progress - start.at) / diff

  Object.keys(start.colours).forEach(key => {
    const startRGB = hexToRgb(start.colours[key])
    const endRGB = hexToRgb(end.colours[key])

    const currRGB = [
      Math.round(lerp(startRGB[0], endRGB[0], progressCurr)),
      Math.round(lerp(startRGB[1], endRGB[1], progressCurr)),
      Math.round(lerp(startRGB[2], endRGB[2], progressCurr))
    ]

    applyColour(key, currRGB)
  })

  sunPos(progress)
}

function getProgress() {
  const d = new Date()
  let progress

  if (config.debug) {
    const time = (d.getSeconds() * 1000) + d.getMilliseconds()
    progress = time / 60000
  } else {
    const time = (d.getHours() * 3600) + (d.getMinutes() * 60) + d.getSeconds()
    progress = time / 86400
  }

  return progress
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null
}

function lerp(start, end, progress) {
  return (1 - progress) * start + progress * end
}

function applyColour(key, colour) {
  const colourString = 'rgb(' + colour.join(',') + ')'
  root.style.setProperty('--' + key, colourString)
}

function round(num, places) {
  const power = Math.pow(10, places)
  return Math.round(num * power) / power
}

function activateSun() {
  const sunWrap = document.querySelector('.b-landscape__sun')
  if (sunWrap) {
    sunWrap.setAttribute('data-active', 'true')
  }
}

function sunPos(progress) {
  const sunWrap = document.querySelector('.b-landscape__sun')
  if (sunWrap) {
    const sunH = -Math.sin(2 * Math.PI * progress / 24)
    const sunV = -Math.sin(2 * Math.PI * (progress - 6) / 24)
    sunWrap.style.setProperty('--sun-h', round(sunH, 3))
    sunWrap.style.setProperty('--sun-v', round(sunV, 3))
  }
}

/**
 * theme picker
 */
const themes = document.querySelectorAll('.b-themes__btn')
if (themes) {
  themes.forEach(function(theme) {
    theme.addEventListener('click', function(e) {
      // set active
      themes.forEach(theme => {
        theme.removeAttribute('data-active')
        this.setAttribute('data-active', '')
      })

      const themeSlug = this.getAttribute('data-theme')

      if (themeSlug === 'live') return startAnim()
      if (animation) endAnim()

      const state = config.states.find(item => item.name === themeSlug)
      Object.keys(state.colours).forEach(key => {
        applyColour(key, hexToRgb(state.colours[key]))
      })
      sunPos(state.at)
    })
  })
}

// initialise
function init() {
  startAnim()
  activateSun()
}
init()
