import config from './landscape-config'
import labToRgb from '../util/lab-to-rgb'

const houdiniSupport = typeof CSS.registerProperty !== 'undefined'

const root = document.documentElement
const themeColour = document.querySelector('meta[name="theme-color"]')
let animMode = 'live'

// check if a theme preference has been set
let theme = 'live'
const lsTheme = localStorage.getItem('theme')
if (lsTheme) {
  theme = lsTheme
}

// add first element of states to end for looping
const dynamicStates = config.states.filter(item => {
  return Boolean(item.dynamic)
})
dynamicStates.push({
  ...dynamicStates[0],
  name: 'end',
  at: 24
})

// if houdini is supported register custom properties for smoother animation support
if (houdiniSupport) {
  Object.keys(dynamicStates[0].colours).forEach(key => {
    CSS.registerProperty({
      name: `--${key}`,
      syntax: '<color>',
      inherits: true,
      initialValue: config.defaultColours[key]
    });
  })
}

// animation
let animation
function startAnim() {
  updateProps()
  animation = setInterval(updateProps, config.anims[animMode].interval)

  if (houdiniSupport) {
    window.requestAnimationFrame(() => {
      root.classList.add('houdini-anim')
    })
  }
}
function endAnim() {
  clearInterval(animation)

  if (houdiniSupport) {
    window.requestAnimationFrame(() => {
      root.classList.remove('houdini-anim')
    })
  }
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
    const startColour = start.colours[key]
    const endColour = end.colours[key]

    const currColour = []
    for (let i = 0; i < startColour.length; i++) {
      currColour[i] = Math.round(
        lerp(
          startColour[i],
          endColour[i],
          progressCurr
        )
      )
    }

    applyColour(key, currColour)

    if (key === 'c1') {
      themeColour.setAttribute('content', formatColour(currColour))
    }
  })

  sunPos(progress)
}

function getProgress() {
  const d = new Date()
  const progress = config.anims[animMode].getProgress(d)

  return progress
}

function formatColour(components) {
  return `rgb(${labToRgb(components).join(',')})`
}

function lerp(start, end, progress) {
  return (1 - progress) * start + progress * end
}

function applyColour(key, colour) {
  root.style.setProperty('--' + key, formatColour(colour))
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

// add event listeners
if (themes) {
  themes.forEach(function(theme) {
    theme.addEventListener('click', function() {
      const themeSlug = this.getAttribute('data-theme')
      changeTheme(themeSlug)
      localStorage.setItem('theme', themeSlug)
    })
  })
}

// change the theme
function changeTheme(themeSlug) {
  // set active
  themes.forEach(theme => {
    theme.removeAttribute('data-active')
  })

  const currentTheme = document.querySelector(`.b-themes__btn[data-theme="${themeSlug}"`)
  currentTheme.setAttribute('data-active', '')

  root.setAttribute('data-theme', themeSlug)

  endAnim()

  if (themeSlug === 'live' || themeSlug === 'cycle') {
    animMode = themeSlug
    return startAnim()
  }

  const state = config.states.find(item => item.name === themeSlug)
  Object.keys(state.colours).forEach(key => {
    applyColour(key, state.colours[key])
  })

  themeColour.setAttribute('content', state.colours.c1)

  sunPos(state.at)
}

// initialise
function init() {
  changeTheme(theme)
  activateSun()
}
init()
