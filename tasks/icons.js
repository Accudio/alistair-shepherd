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

  console.log('Building icons with gulp')

  return src(options.in)
    .pipe(svgmin(function(file) {
      var prefix = options.prefix + path.basename(file.relative, path.extname(file.relative))
      return {
        plugins: [
          ...svgoWhitelist(['cleanupIDs']),
          {
            cleanupIDs: {
              prefix: prefix + '-',
              minify: true
            }
          }]
      }
    }))
    .pipe(svgstore())
    .pipe(svgmin(function() {
      return {
        plugins: svgoWhitelist(['removeDoctype', 'removeXMLProcInst'])
      }
    }))
    .pipe(rename({ basename: 'icons' }))
    .pipe(dest(options.out))
}

module.exports = icons

/**
 * svgoWhitelist
 *
 * utility function
 *
 * @param {array} enabled plugins that should be left enabled
 */
function svgoWhitelist(enabled) {
  const allPlugins = ['cleanupAttrs', 'inlineStyles', 'removeDoctype', 'removeXMLProcInst', 'removeComments', 'removeMetadata', 'removeTitle', 'removeDesc', 'removeUselessDefs', 'removeXMLNS', 'removeEditorsNSData', 'removeEmptyAttrs', 'removeHiddenElems', 'removeEmptyText', 'removeEmptyContainers', 'removeViewBox', 'cleanupEnableBackground', 'minifyStyles', 'convertStyleToAttrs', 'convertColors', 'convertPathData', 'convertTransform', 'removeUnknownsAndDefaults', 'removeNonInheritableGroupAttrs', 'removeUselessStrokeAndFill', 'removeUnusedNS', 'prefixIds', 'cleanupIDs', 'cleanupNumericValues', 'cleanupListOfValues', 'moveElemsAttrsToGroup', 'moveGroupAttrsToElems', 'collapseGroups', 'removeRasterImages', 'mergePaths', 'convertShapeToPath', 'convertEllipseToCircle', 'sortAttrs', 'sortDefsChildren', 'removeDimensions', 'removeAttrs', 'removeAttributesBySelector', 'removeElementsByAttr', 'addClassesToSVGElement', 'addAttributesToSVGElement', 'removeOffCanvasPaths', 'removeStyleElement', 'removeScriptElement', 'reusePaths']
  const disabled = allPlugins.filter(function(val) {
    return enabled.indexOf(val) === -1
  })
  const plugins = []
  disabled.forEach(function(plugin) {
    const tmpPlugin = {}
    tmpPlugin[plugin] = false
    plugins.push(tmpPlugin)
  })
  return plugins
}
