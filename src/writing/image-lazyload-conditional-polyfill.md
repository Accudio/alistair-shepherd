---
title: Conditionally loading a native image lazyload polyfill/library
date: '2021-06-11'
excerpt: How you can feature detect native image lazyloading support and load a JS library if not.
metaDesc: How you can feature detect native image lazyloading support and load a JS library if not.
tags:
- JavaScript
- Performance
- Images
---

My [previous blogpost](/writing/focus-visible-conditional-polyfill/) was about how to load a `:focus-visible` polyfill only if the requesting browser doesn't support it. Similar to that, this snippet will help you to load an image lazyloading JavScript library, only when [native lazyloading](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading) isn't supported.

## Intro to lazyloading

Lazyloading images has been a good practice for web page performance for some time, and recommended by tools like [Lighthouse](https://web.dev/measure/), [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) and [WebPageTest](https://www.webpagetest.org/) among others. This traditionally had to implemented using a JS library like [Lazysizes](https://github.com/aFarkas/lazysizes).

These libraries monitor what is visible within the browser and only when an image is about to come into view is it loaded. This means that browser won't need to download any images that are never seen - reducing data use and potentially improving front-end performance.

## Native lazyloading

Given the prevelance of this practice, the Chrome team and HTML Spec folk introduced lazyloading behaviour natively into the browser via the `loading` attribute on `img` tags. We can already make our current `img` tags lazy by adding `loading="lazy"` to the element like so:

```html
<img src="/assets/example.jpg" alt="Example image" width="200" height="100" loading="lazy">
```

[Browser support](https://caniuse.com/loading-lazy-attr) is decent at around 70% between Chromium-based and Firefox-based browsers, but it unfortunately isn't yet in Safari or for iOS at all.

As with my focus-visible conditional loading, ideally we load a JavaScript library/polyfill only if the new feature isn't supported.

## Loading the library conditionally

The progressive nature of the `loading` attribute means older browsers without support will still load the images. That is normally great as it keeps the web backwards-compatible and often usable in old browsers and devices. In this case however, it makes it a little tricky for us to prevent the loading of images outside of the current view.

Browsers that don't support the attribute ignore it and will just load the images normally. By the time we've loaded our script, the browser may have already downloaded many or all of the images on the page unnecessarily.

What we have to do is provide our markup in the format of the lazyload library we are using. We then check for support of native lazyloading and either load our library or run some JS to adapt our markup to 'normal'.

Before the closing `</body>` we include our conditional loading snippet like this:

```html
<script>
  let hasLibLoaded = false;
  // in a function so we cn re-run if data is added dynamically
  window.loadingPolyfill = () => {
    // check if loading attribute supported
    if ('loading' in HTMLImageElement.prototype) {
      // get all <img> and <source> elements
      const images = document.querySelectorAll('img[data-src]');
      const sources = document.querySelectorAll('source[data-srcset]');

      // loop through <img>s setting the src attribute and srcset and sizes if present
      for (let img of images) {
        img.src = img.getAttribute('data-src');
        const srcset = img.getAttribute('data-srcset');
        if (srcset) {
          img.srcset = srcset;
        }
        const sizes = img.getAttribute('data-sizes');
        if (sizes) {
          img.sizes = sizes;
        }
      }

      // loop through <source>s setting the srcset attribute and sizes if present
      for (let source of sources) {
        source.srcset = source.getAttribute('data-srcset');
        const sizes = source.getAttribute('data-sizes');
        if (sizes) {
          source.sizes = sizes
        }
      }

    // if loading attribute is not supported
    } else {
      // check we haven't already loaded the library
      if (!hasLibLoaded) {
        // create script element with src pointing to our library and add to document
        const script = document.createElement('script');
        script.src = '/js/lazysizes.js';
        document.body.appendChild(script);

        // mark library as loaded
        hasLibLoaded = true;

      // lazyloading library has already been loaded
      } else {
        // depending on your library you may need to run findNewItems() or something along
        // those lines to adapt new content. Some libraries including lazysizes don't need this.
      }
    }
  }
  // run our loading polyfill
  window.loadingPolyfill();
</script>
```

We assign our function globally on the `window` object so that if any content is loaded via JavaScript (eg AJAX or client-side-routing) you call call `window.loadingPolyfill()` again and it will re-run including new images.

## Notes

- Make sure the `script.src` points to your JS library - locall or using a CDN like [JSDelivr](https://www.jsdelivr.com/package/npm/lazysizes).
- Depending on your lazyloading library, you may need to change `data-src`, `data-srcset` and `data-sizes`. Many use this convention but not all, eg [Uncloak](https://github.com/hannahwoodward/uncloak) uses `data-uncloak-src`.
- If you need to support older browsers like IE11 then you will need to check your lazyload library and adapt the code above. Alternatively consider including a `legacy.js` script that has the same functionality as our supporting case, that will fall back to standard image loading for old browsers.

## Performance Impact

Despite minimal, this will have a performance impact on both supporting and non-supporting browsers.

### Supporting browsers

In theory browsers are able to start downloading high-priority images before the full document is parsed. Because there is no `src` atribute, our solution stops this from happening until our script runs near the end of the document. Unless you have a very long HTML document though, it's unlikely this will be more than a few milliseconds. Regardless, I would suggest avoiding this practice for your most important above-the-fold images like logos or hero images.

### Non-supporting browsers

As we are loading our JS library asyncronously, this generally means it has a lower download priority than it would otherwise. There is no easy way around this, but I couldn't see any conslusive impact when testing on Safari. Take that with a pinch of salt though, it will depend a lot on how your website is built and the visiting device. I don't think this will be very significant however.

## Further Reading

- [loading attribute on MDN (developer.mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-loading)
- [web.dev lazy loading article (web.dev)](https://web.dev/browser-level-image-lazy-loading/)
- [lazysizes JS library (github.com)](https://github.com/aFarkas/lazysizes)
- [focus-visible polyfill (alistairshepherd.uk)](/writing/focus-visible-conditional-polyfill/)
- The [loading attribute polyfill (github.com)](https://github.com/mfranzke/loading-attribute-polyfill) should work with some modifications to the code above, although I haven't used it before.
