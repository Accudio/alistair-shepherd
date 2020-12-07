const button = document.getElementById('naked')
const items = [
  ...document.querySelectorAll('link[rel="stylesheet"]'),
  ...document.querySelectorAll('style')
]
const nakedStylesheet = document.getElementById('naked-stylesheet')

let naked = false

button.addEventListener('click', () => {
  naked = !naked

  items.forEach(item => {
    item.disabled = !item.disabled
  })

  if (naked) {
    nakedStylesheet.setAttribute('rel', 'stylesheet')
  } else {
    nakedStylesheet.setAttribute('rel', 'none')
  }
})
