const { src, dest } = require('gulp')
const assets = require('gulp-asset-hash')
const gulpEsbuild = require('gulp-esbuild')

const isProd = process.env.NODE_ENV === 'production'

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
        // eslint-disable-next-line quote-props
        'ENV': `"${process.env.NODE_ENV}"`
      }
    }))
    .pipe(dest(options.out))
    .pipe(assets.hash({
      hashKey: 'a1',
      length: 5,
      manifest: 'src/_includes/bundle/asset-manifest.json'
    }))
    .pipe(dest(options.out))
}

module.exports = scripts
