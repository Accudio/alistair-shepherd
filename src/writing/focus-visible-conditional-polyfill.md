---
title: Conditionally loading a polyfill for :focus-visible
date: '2021-05-21'
excerpt: Helpful snippet to load the polyfill for CSS pseudo class :focus-visible conditionally.
metaDesc: Helpful snippet to load the polyfill for CSS pseudo class :focus-visible conditionally.
tags:
- CSS
- JavaScript
- Performance
---

The future of focus is `:focus-visible`! Although [browser support](https://caniuse.com/?search=focus-visible) is decent, [Safari is still working on](https://blogs.igalia.com/mrego/2021/01/28/focus-visible-in-webkit-january-2021) this important accessibility feature.

In the meantime, we can load the [WICG focus-visible polyfill](https://github.com/WICG/focus-visible) to offer improved focus styles in browsers that yet don't support it. Ideally we don't force browsers that support focus-visible to download a polyfill when it's unnecessary - and in future when all modern browsers support the feature, we don't want to ship that redundant code.

Here is a snippet we can use to only load the focus-visible polyfill if it isn't supported! Insert this before the closing `</body>` and change the `script.src` to point to your local copy of the polyfill (or use an asset CDN like [jsdelivr](https://www.jsdelivr.com/package/npm/focus-visible)).

```html
<script>
  try {
    document.body.querySelector(':focus-visible');
  } catch (error) {
    var script = document.createElement('script');
    script.src = "/js/focus-visible.js";
    document.body.appendChild(script);
  }
</script>
```

## CSS

You'll also need to write CSS to handle focus indicators in three circumstances:

1. focus-visible is supported;
2. focus-visible not supported, but polyfill has been loaded;
3. focus-visible not supported, polyfill not loaded.

This is my setup for these cases:

```css
/**
 * My focus styles
 */
:focus {
  outline: 2px dashed currentColor;
  outline-offset: .25rem;
}

/**
 * When focus-visible is supported:
 * remove outline when :focus but not :focus-visible
 */
:focus:not(:focus-visible) {
  outline: none;
}

/**
 * when polyfill loaded:
 * remove outline when :focus but not .focus-visible
 */
.js-focus-visible :focus:not(.focus-visible) {
  outline: none;

```

## Notes

* This does add an additional script to load for browsers without support, but by adding the script as above loads it asyncronously. The browser will prioritise other resources, and the worst case is it isn't loaded by the first interaction and a fallback `:focus` indicator is shown.
* If you have a build step that minifies/optimises your CSS, you may find that the two `outline: none` declarations are combined into a single rule. Due to how the browser ignores any rules with selectors it doesn't understand, this won't work. You may need to disable optimisation on this step, or in my case I changed one of the `outline: none` declarations to `outline: 0`. This CSS works the same, but means they won't be combined into a single rule by most minifiers.

## Further reading

* [WICG focus-visible polyfill](https://github.com/WICG/focus-visible)
* [Matthias Ott - :focus-visible is here](https://matthiasott.com/notes/focus-visible-is-here)
* [MDN - :focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)
* [CSS Tricks Almanac - :focus-visible](https://css-tricks.com/almanac/selectors/f/focus-visible/)
* [CanIUse - :focus-visible browser support](https://caniuse.com/?search=focus-visible)
* [Igalia - :focus-visible in WebKit - January 2021](https://blogs.igalia.com/mrego/2021/01/28/focus-visible-in-webkit-january-2021/)
