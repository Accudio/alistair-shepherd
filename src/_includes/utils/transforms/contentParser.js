const jsdom = require('@tbranyen/jsdom')
const { JSDOM } = jsdom

// Parse the page HTML content and perform some manipulation
module.exports = function(value, outputPath) {
  if (outputPath.endsWith('.html')) {
    /**
     * create the document model
     */
    const DOM = new JSDOM(value)
    const document = DOM.window.document

    /**
     * Get all the images from the post
     */
    const images = [...document.querySelectorAll('main article img')]
    if (images.length) {
      images.forEach(image => {
        /**
         * Set the loading attribute to all images to
         * be lazy loaded if supported and not set
         */
        if (!image.hasAttribute('loading')) {
          image.setAttribute('loading', 'lazy')
        }
      })
    }

    /**
     * Get all the iframes inside the article
     * and wrap them inside a class
     */
    const articleEmbeds = [...document.querySelectorAll('main article iframe')]
    if (articleEmbeds.length) {
      articleEmbeds.forEach(embed => {
        const wrapper = document.createElement('div')
        embed.setAttribute('loading', 'lazy')
        setClass(wrapper, ['iframe'])
        wrapper.appendChild(embed.cloneNode(true))
        embed.replaceWith(wrapper)
      })
    }

    /**
     * Get all the code snippets, wrap them inside a div to apply
     * custom style and add tabindex to make keyboard-accessible
     */
    const codeSnippets = [...document.querySelectorAll('pre[class^="language"')]
    if (codeSnippets.length) {
      codeSnippets.forEach(embed => {
        embed.setAttribute('tabindex', '0')

        const wrapper = document.createElement('div')
        setClass(wrapper, ['code-wrapper'])

        wrapper.appendChild(embed.cloneNode(true))
        embed.replaceWith(wrapper)
      })
    }

    /**
     * Get all links with explicit href
     * and add noopener rel value
     */
    const links = [...document.querySelectorAll('a[href]')]
    if (links.length) {
      links.forEach(link => {
        /**
         * For each link found get all the original attributes
         * and apply them to the custom link element
         */
        const externalLink = document.createElement('a')
        if (link.hasAttributes()) {
          const linkAttributes = link.attributes
          for (var i = linkAttributes.length - 1; i >= 0; i--) {
            externalLink.setAttribute(
              linkAttributes[i].name,
              linkAttributes[i].value
            )
          }
        }

        /**
         * If the link starts with http or https append
         * the "noopener" value to the rel attribute
         */
        const getHref = link.getAttribute('href')
        const currentRel = link.getAttribute('rel')
        const isExternal =
          getHref.startsWith('http') || getHref.startsWith('https')
        if (isExternal) {
          externalLink.setAttribute(
            'rel',
            currentRel && !currentRel.includes('noopener')
              ? `${currentRel} noopener noreferrer`
              : 'noopener noreferrer'
          )
        }
        externalLink.innerHTML = link.innerHTML
        link.replaceWith(externalLink.cloneNode(true))
      })
    }

    return '<!DOCTYPE html>\r\n' + document.documentElement.outerHTML
  }
  return value
}

function setClass(element, list) {
  list.map(item => element.classList.add(item))
}
