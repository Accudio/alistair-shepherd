const { src, dest, } = require('gulp')
const gulpEsbuild = require('gulp-esbuild')

const isProd = process.env.ELEVENTY_ENV === 'production'

// gulp options
const options = {
  in: 'src/assets/js/*.js',
  out: 'dist/assets/js/'
}

// script generation
const scripts = () => {
  return src(options.in)
    .pipe(gulpEsbuild({
      bundle: true,
      minify: isProd,
      sourcemap: !isProd,
      target: [
        'es6',
        'chrome71',
        'firefox78',
        'safari12.1'
      ],
      define: {
        'ENV': `"${process.env.NODE_ENV}"`,
      }
    }))
    .pipe(dest(options.out))
}

module.exports = scripts
