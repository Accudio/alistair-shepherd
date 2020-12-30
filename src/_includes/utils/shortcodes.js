const icons = require('./shortcodes/icons')
const divider = require('./shortcodes/divider')

const { src, srcset, sizes } = require('./shortcodes/images')

module.exports = function(config) {
  config.addShortcode('icon', icons)
  config.addNunjucksAsyncShortcode('divider', divider)

  config.addShortcode('src', src)
  config.addShortcode('srcset', srcset)
  config.addShortcode('sizes', sizes)
}
