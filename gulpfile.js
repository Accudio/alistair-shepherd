const {parallel, watch} = require('gulp')

// pull in tasks
const icons = require('./tasks/icons.js')

/**
 * set each directory and contents that we want to watch and
 * assign the relevant task. `ignoreInitial` set to true will
 * prevent the task being run when we run `gulp watch`, but it
 * will run when a file changes.
 */
const watcher = () => {
  watch('./src/_includes/icons/*.svg', {ignoreInitial: true}, icons)
}

// default - run each task in parallel
exports.default = parallel(icons)

// watcher task that instructs gulp to watch directories and act accordingly
exports.watch = watcher
