const manifest = require('../../bundle/asset-manifest.json')

const outDir = 'dist'

// get path from manifest
module.exports = function(path) {
  if (process.env.ELEVENTY_ENV !== 'production') return path

  const srcPath = outDir + path

  if (!manifest[srcPath]) return path

  const hashPath = manifest[srcPath].path
  const hashUrl = hashPath.substring(outDir.length)
  return hashUrl
}
