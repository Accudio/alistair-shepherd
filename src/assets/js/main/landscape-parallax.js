const container = document.querySelector('.app')

let currentPos = 0
let scrollPos = 0
function animation() {
  scrollPos = container.scrollTop
  movePositions()
  container.style.setProperty('--scrollPos', currentPos + 'px')
  window.requestAnimationFrame(animation)
}

// if the current position doesn't match the scroll position move it towards it
function movePositions() {
  if (currentPos == scrollPos) return

  // get the difference between currentPos and scrollPos
  const posDiff = Math.abs(currentPos - scrollPos)

  // use difference to calculate a 'speed', or number of px to move this frame.
  // this means that the time it takes to sync the scroll is dependent on scroll distance, not time.
  // we divide this so the further away, the faster it moves
  const speed = Math.max(1, posDiff / 9)

  // if we're close set it to the exact number rather than tweaking it
  if (posDiff < speed) {
    currentPos = scrollPos
    return
  }

  if (currentPos > scrollPos) {
    currentPos = currentPos - speed
    return
  }

  currentPos = currentPos + speed
}

window.requestAnimationFrame(animation)
