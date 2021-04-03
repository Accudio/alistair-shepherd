const htmlMin = require('./transforms/htmlmin')
const contentParser = require('./transforms/contentParser')
const purgeCss = require('./transforms/purgecss')

module.exports = function(config) {
  if (process.env.ELEVENTY_ENV === 'production') {
    config.addTransform('purgecss', purgeCss)
  }

  config.addTransform('contentParser', contentParser)

  if (process.env.ELEVENTY_ENV === 'production') {
    config.addTransform('htmlmin', htmlMin)
  }
}
