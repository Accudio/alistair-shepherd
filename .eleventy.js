// util
const fs = require('fs')

// plugins
const syntaxHighlightPlugin = require('@11ty/eleventy-plugin-syntaxhighlight')
const rssPlugin = require('@11ty/eleventy-plugin-rss')
// const pwaPlugin = require('eleventy-plugin-pwa')
const sitemapPlugin = require('@quasibit/eleventy-plugin-sitemap')

// filters, transforms and shortcodes can be found in utils
const addFilters = require('./src/_includes/utils/filters')
const addTransforms = require('./src/_includes/utils/transforms')
const addShortcodes = require('./src/_includes/utils/shortcodes')

/**
 * Import site configuration
 */
const siteConfig = require('./src/_data/config.json')
const { configFunction } = require('@11ty/eleventy-plugin-syntaxhighlight')

module.exports = function (config) {
  addFilters(config)
  addTransforms(config)
  addShortcodes(config)

  /**
   * custom watch targets
   */
  config.addWatchTarget('./bundle/')

  /**
   * passthrough file copy
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
   * plugins
   */
  config.addPlugin(rssPlugin)
  config.addPlugin(syntaxHighlightPlugin)
  // config.addPlugin(pwaPlugin)
  config.addPlugin(sitemapPlugin, {
    sitemap: {
      hostname: siteConfig.url
    }
  })

  /**
   * custom blog post collection
   */
  // blog posts collection
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
   * work collection
   */
  config.addCollection('work', collection => {
    return [
      ...collection
        .getFilteredByGlob(
          `./${siteConfig.paths.src}/work/**/*`
        )
    ]
  })

  /**
   * override BrowserSync Server options
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
    // set local server 404 fallback
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
   * disable use gitignore for avoiding ignoring of /bundle folder during watch
   */
  config.setUseGitIgnore(false);

  /**
   * eleventy configuration object
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