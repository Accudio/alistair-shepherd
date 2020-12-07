// robot friendly date format for crawlers
module.exports = function(value) {
  const dateObject = new Date(value)

  return dateObject.toISOString()
}
