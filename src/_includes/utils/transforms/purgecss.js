const { JSDOM } = require('@tbranyen/jsdom')
const { PurgeCSS } = require('purgecss')

module.exports = async (content, outputPath) => {
  if (outputPath.endsWith('.html')) {
    /**
     * create the document model
     */
    const DOM = new JSDOM(content)
    const document = DOM.window.document

    const initialStyles = document.querySelectorAll('style[data-inline]')

    for (const initialStyleEl of initialStyles) {
      const unpurgedStyles = initialStyleEl.innerHTML

      const purgeCSSResults = await new PurgeCSS().purge({
        content: [{ raw: content }],
        css: [{ raw: unpurgedStyles }],
        safelist: [
          /::-webkit-scrollbar/
        ]
      })

      initialStyleEl.innerHTML = purgeCSSResults[0].css

      initialStyleEl.removeAttribute('data-inline')
    }

    return document.documentElement.outerHTML
  }

  return content
}
