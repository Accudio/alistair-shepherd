import config from './landscape-config'

const root = document.documentElement
let animMode = 'live'

// add first element of states to end for looping
const dynamicStates = config.states.filter(item => {
  return Boolean(item.dynamic)
})
dynamicStates.push({
  ...dynamicStates[0],
  name: 'end',
  at: 24
})

// animation
let animation
function startAnim() {
  updateProps()
  animation = setInterval(updateProps, config.anims[animMode].interval)
}
function endAnim() {
  clearInterval(animation)
}

// set colour
function updateProps() {
  const progress = getProgress() * 24

  const endIndex = dynamicStates.findIndex(frame => {
    return frame.at !== 0 && progress < frame.at
  })
  const startIndex = endIndex - 1

  const start = dynamicStates[startIndex]
  const end = dynamicStates[endIndex]

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
  const progress = config.anims[animMode].getProgress(d)

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

      root.setAttribute('data-theme', themeSlug)

      endAnim()

      if (themeSlug === 'live' || themeSlug === 'cycle') {
        animMode = themeSlug
        return startAnim()
      }

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
