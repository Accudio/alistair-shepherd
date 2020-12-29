const { dest, src } = require('gulp')

const sassProcessor = require('gulp-sass')
const globImporter = require('node-sass-glob-importer')
sassProcessor.compiler = require('node-sass')

const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')

const csso = require('gulp-csso')

const sourcemaps = require('gulp-sourcemaps')

const isProd = process.env.ELEVENTY_ENV === 'production'

const options = {
  in: 'src/assets/scss/*.scss',
  out: 'dist/assets/css',
  criticalOut: './src/_includes/bundle/css',
  criticalStyles: [
    'critical.scss'
  ]
}

// grab all root scss files, processes, sends them to output calculator
const sass = () => {
  let stream = src(options.in)

  // initialise sourcemaps
  if (!isProd) {
    stream = stream
      .pipe(sourcemaps.init())
  }

  // sass
  stream = stream
    .pipe(sassProcessor({
      importer: globImporter(),
      includePaths: ['node_modules']
    }).on('error', sassProcessor.logError))

  // postcss
  stream = stream
    .pipe(postcss([
      autoprefixer()
    ]))

  // csso
  if (isProd) {
    stream = stream
      .pipe(csso())
  }

  // write sourcemaps
  if (!isProd) {
    stream = stream
      .pipe(sourcemaps.write())
  }

  return stream.pipe(dest(calculateOutput))
}

module.exports = sass

/**
 * calculateOutput
 *
 * determine where output file goes based on input
 *
 * @param {object}
 */
const calculateOutput = ({history}) => {
  // get filename of source
  const sourceFileName = /[^/]*$/.exec(history[0])[0]

  // if critical, set output directory to criticalOut
  if (options.criticalStyles.includes(sourceFileName)) {
    return options.criticalOut
  }

  return options.out
}
