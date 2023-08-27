// util
const fs = require('fs')

// plugins
const syntaxHighlightPlugin = require('@11ty/eleventy-plugin-syntaxhighlight')
const rssPlugin = require('@11ty/eleventy-plugin-rss')
const sitemapPlugin = require('@quasibit/eleventy-plugin-sitemap')
const embedCodePen = require('@manustays/eleventy-plugin-codepen-iframe')
const { EleventyRenderPlugin } = require("@11ty/eleventy");

// filters, transforms and shortcodes can be found in utils
const addFilters = require('./src/_includes/utils/filters')
const addTransforms = require('./src/_includes/utils/transforms')
const addShortcodes = require('./src/_includes/utils/shortcodes')

// markdown configuration
const markdownIt = require('markdown-it')
const markdownItAttrs = require('markdown-it-attrs')

/**
 * Import site configuration
 */
const siteConfig = require('./src/_data/config.json')

module.exports = function (config) {
  addFilters(config)
  addTransforms(config)
  addShortcodes(config)

  /**
   * custom watch targets
   */
  config.addWatchTarget('src/_includes/bundle/**/*')

  /**
   * passthrough file copy
   */
  config.addPassthroughCopy({
    'static/': '.'
  })
  config.addPassthroughCopy({
    'src/_includes/bundle/assets/scss': 'assets/css'
  })
  config.addPassthroughCopy({
    'src/images': 'raw-images'
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
  config.addPlugin(embedCodePen, {
    tabs: 'result',
    height: 380,
    user: 'accudio'
	})
  config.addPlugin(EleventyRenderPlugin)

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
   * markdown configuration
   */
  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAttrs).disable('code');
  config.setLibrary('md', markdownLibrary);

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
