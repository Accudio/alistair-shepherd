(async () => {
  // only load the polyfill if ViewTimeline isn't supported
  if (typeof ViewTimeline === 'undefined') {
    // needs to be set in a variable so ESBuild doesn't load it even if not needed
    const importUrl = '/assets/js/scroll-timeline-polyfill.js'
    await import(importUrl)
  }

  const app = document.querySelector('.app')
  const layers = document.querySelectorAll('.b-landscape__layer, .b-landscape__sun')

  // create a placeholder element to track the right timing
  // see details on why this is needed here: https://codepen.io/bramus/pen/VwXMRrW?editors=0010
  const placeholder = document.createElement('div')
  placeholder.setAttribute('style', 'position:absolute;top:100vh;left:0;height:75vh;width:100%;pointer-events:none')
  app.appendChild(placeholder)

  // create our timeline relative to the placeholder element
  const timeline = new ViewTimeline({
    subject: placeholder,
    axis: 'vertical'
  })

  // animate each layer based on its offset
  layers.forEach(layer => {
    const offset = parseFloat(layer.getAttribute('data-offset'))
    layer.animate(
      {
        transform: [
          'translateY(0)',
          `translateY(calc(75vh * ${offset}))`
        ]
      },
      {
        timeline,
        fill: 'forwards',
        delay: { phase: "enter", percent: CSS.percent(0) },
        endDelay: { phase: "enter", percent: CSS.percent(100) }
      }
    );
  });
})()
