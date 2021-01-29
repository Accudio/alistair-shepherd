module.exports = () => ({
  layout: 'post.njk',
  eleventyComputed: {
    eleventyExcludeFromCollections: data => (data.draft || false),
    permalink: data => {
      if (data.draft || false) {
        return `/writing/drafts/${data.page.fileSlug}/`
      }
      return data.permalink || `/writing/${data.page.fileSlug}/`
    }
  }
})
