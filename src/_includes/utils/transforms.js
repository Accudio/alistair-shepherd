const htmlMin = require('./transforms/htmlmin')
const contentParser = require('./transforms/contentParser')

module.exports = function(config) {
  config.addTransform('contentParser', contentParser)

  if (process.env.ELEVENTY_ENV === 'production') {
    config.addTransform('htmlmin', htmlMin)
  }
}
