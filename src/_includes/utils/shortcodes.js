const icons = require('./shortcodes/icons')
const divider = require('./shortcodes/divider')

module.exports = function(config) {
  config.addShortcode('icon', icons)
  config.addNunjucksAsyncShortcode('divider', divider)
}
