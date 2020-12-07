const globImporter = require('node-sass-glob-importer')

module.exports = {
  importer: globImporter(),
  includePaths: ['node_modules']
}
