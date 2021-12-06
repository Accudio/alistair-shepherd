const { dest, src } = require('gulp')
const path = require('path')

const svgstore = require('gulp-svgstore')
const svgmin = require('gulp-svgmin')
const rename = require('gulp-rename')

// gulp options
const options = {
  in: 'src/assets/icons/*.svg',
  out: 'src/_includes/bundle',
  prefix: 'icons-'
}

// icon set generation
const icons = () => {
  return src(options.in)
    .pipe(svgmin(function(file) {
      var prefix = options.prefix + path.basename(file.relative, path.extname(file.relative))
      return {
        full: true,
        plugins: [
          {
            name: 'cleanupIDs',
            prefix: prefix + '-',
            minify: true
          }
        ]
      }
    }))
    .pipe(svgstore())
    .pipe(svgmin(function() {
      return {
        full: true,
        plugins: [
          {
            name: 'removeDoctype',
            active: true
          },
          {
            name: 'removeXMLProcInst',
            active: true
          }
        ]
      }
    }))
    .pipe(rename({ basename: 'icons' }))
    .pipe(dest(options.out))
}

module.exports = icons
