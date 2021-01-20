const now = new Date()

module.exports = {
  IS_DEV: process.env.ELEVENTY_ENV !== 'production',
  date: {
    d: pad(now.getDate(), 2),
    m: pad(now.getMonth() + 1, 2),
    y: now.getFullYear()
  }
}

function pad(string, width) {
  string = string + ''
  return string.length >= width ? string : new Array(width - string.length + 1).join('0') + string
}
