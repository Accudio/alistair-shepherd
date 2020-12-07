const date = require('./filters/date')
const htmlDate = require('./filters/htmlDate')

module.exports = function(config) {
  config.addFilter('date', date)
  config.addFilter('htmlDate', htmlDate)

  // JSON.stringify filter
  config.addFilter('stringify', function(value) {
    return JSON.stringify(value)
  })
}
