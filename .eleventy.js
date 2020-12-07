// util
const fs = require('fs')

// plugins
const syntaxHighlightPlugin = require('@11ty/eleventy-plugin-syntaxhighlight')
const rssPlugin = require('@11ty/eleventy-plugin-rss')
const pwaPlugin = require('eleventy-plugin-pwa')

// filters, transforms and shortcodes can be found in utils
const addFilters = require('./src/_includes/utils/filters')
const addTransforms = require('./src/_includes/utils/transforms')
const addShortcodes = require('./src/_includes/utils/shortcodes')

/**
 * Import site configuration
 */
const siteConfig = require('./src/_data/config.json')

module.exports = function (config) {
  addFilters(config)
  addTransforms(config)
  addShortcodes(config)

  /**
   * Add custom watch targets
   *
   * @link https://www.11ty.dev/docs/config/#add-your-own-watch-targets
   */
  config.addWatchTarget('./bundle/')

  /**
   * Passthrough file copy
   *
   * @link https://www.11ty.io/docs/copy/
   */
  config.addPassthroughCopy({
    './static': '.'
  })
  config.addPassthroughCopy({
    'src/_includes/bundle/assets/js': 'assets/js',
    'src/_includes/bundle/assets/scss': 'assets/css'
  })
  config.addPassthroughCopy({
    'src/_includes/bundle/images': 'images'
  })

  /**
   * Add Plugins
   * @link https://github.com/11ty/eleventy-plugin-rss
   * @link https://github.com/11ty/eleventy-plugin-syntaxhighlight
   * @link https://github.com/okitavera/eleventy-plugin-pwa
   */
  config.addPlugin(rssPlugin)
  config.addPlugin(syntaxHighlightPlugin)
  config.addPlugin(pwaPlugin)

  /**
   * Create custom data collections
   * for blog and feed
   * Code from https://github.com/hankchizljaw/hylia
   */
  // Blog posts collection
  const now = new Date()
  const livePosts = post => post.date <= now && !post.data.draft
  config.addCollection('posts', collection => {
    return [
      ...collection
      .getFilteredByGlob(
        `./${siteConfig.paths.src}/${siteConfig.paths.blogdir}/**/*`
      )
      .filter(livePosts)
    ]
  })

  /**
   * Override BrowserSync Server options
   *
   * @link https://www.11ty.dev/docs/config/#override-browsersync-server-options
   */
  config.setBrowserSyncConfig({
    ...config.browserSyncConfig,
    notify: false,
    open: false,
    snippetOptions: {
      rule: {
        match: /<\/head>/i,
        fn: function (snippet, match) {
          return snippet + match
        },
      },
    },
    // Set local server 404 fallback
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync(`${siteConfig.paths.output}/404.html`)

        browserSync.addMiddleware('*', (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404)
          res.end()
        })
      }
    }
  })

  /*
   * Disable use gitignore for avoiding ignoring of /bundle folder during watch
   * https://www.11ty.dev/docs/ignores/#opt-out-of-using-.gitignore
   */
  config.setUseGitIgnore(false);

  /**
   * Eleventy configuration object
   */
  return {
    dir: {
      input: siteConfig.paths.src,
      includes: siteConfig.paths.includes,
      layouts: `${siteConfig.paths.includes}/layouts`,
      output: siteConfig.paths.output
    },
    passthroughFileCopy: true,
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  }
}
