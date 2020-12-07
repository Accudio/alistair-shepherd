const icons = require('./shortcodes/icons')
const divider = require('./shortcodes/divider')
const plaiceholder = require('./shortcodes/plaiceholder')

module.exports = function(config) {
  config.addShortcode('icon', icons)
  config.addNunjucksAsyncShortcode('divider', divider)
  config.addNunjucksAsyncShortcode('plaiceholder', plaiceholder)
}
