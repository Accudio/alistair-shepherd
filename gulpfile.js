const { parallel, watch } = require('gulp')

// pull in tasks
const fonts = require('./tasks/fonts.js')
const icons = require('./tasks/icons.js')
const sass = require('./tasks/sass.js')
const scripts = require('./tasks/scripts.js')

// watch files and run task when it changes
const watcher = () => {
  watch('src/assets/icons/*.svg', { ignoreInitial: true }, icons)
  watch('src/assets/js/**/*.js', { ignoreInitial: true }, scripts)
  watch('src/assets/scss/**/*.scss', { ignoreInitial: true }, sass)
}

// default - run each task in parallel
exports.default = parallel(fonts, icons, sass, scripts)

// watch task
exports.watch = watcher
