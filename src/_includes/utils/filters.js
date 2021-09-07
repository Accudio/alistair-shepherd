const asset = require('./filters/asset')
const date = require('./filters/date')
const htmlDate = require('./filters/htmlDate')

module.exports = function(config) {
  config.addFilter('asset', asset)
  config.addFilter('date', date)
  config.addFilter('htmlDate', htmlDate)

  // JSON.stringify filter
  config.addFilter('stringify', function(value) {
    return JSON.stringify(value)
  })

  // return first n items of array/collection
  config.addFilter('limit', function(array, limit) {
    return array.slice(0, limit)
  })
}
