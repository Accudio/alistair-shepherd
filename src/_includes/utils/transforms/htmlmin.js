const htmlmin = require('html-minifier')

// Minify HTML when building for production
module.exports = function(content, outputPath) {
  if (outputPath.endsWith('.html')) {
    const minified = htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
      minifyCSS: true
    })
    return minified
  }

  return content
}
