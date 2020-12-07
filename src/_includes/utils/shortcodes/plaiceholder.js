const fs = require('fs')
const path = require('path')
const pify = require('promisify-4loc')
const { getPixelsCSS } = require('@plaiceholder/css')

// plaiceholder
module.exports = async function plaiceholder(imagePath) {
  const image = await pify(fs.readFile)(
    path.join(process.cwd(), 'src/', imagePath)
  )

  const css = await getPixelsCSS(image)

  return `<div
    class="plaice"
    style="
      background-image:${css.backgroundImage};
      background-position:${css.backgroundPosition};
      background-size:${css.backgroundSize};
      background-repeat:${css.backgroundRepeat};
    "
  ></div>`
}
