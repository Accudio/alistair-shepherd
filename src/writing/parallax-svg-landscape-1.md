---
title: Making a Parallax SVG Landscape - new site part 1
date: '2021-01-29'
excerpt: How I made the parallax SVG landscape in the header of my website. First of a series of two.
metaDesc: A parallax SVG landscape in the style of Firewatch, using HTML, CSS, SVG and a sprinkle of JavaScript.
eleventyExcludeFromCollections: true
---

I've finally finished my new website, and I am really happy with it. I started the site in July 2020 and I launched it in mid January 2021.

It's a big change from Nuxt, Vue and Webpack to doing pretty much everything myself with 11ty (Eleventy) and gulp—but I love it. More on that in a future post, today is about the star of the show—the parallax landscape you see at the top of the page.

If you're the type who wants to dive straight into the code, [here's a CodePen for it](https://codepen.io/accudio/pen/ExNxXrP) - go ahead and have a play!

{% CodePen "https://codepen.io/accudio/pen/ExNxXrP" %}

For those still with me, I'll explain how it's built and how I got here.

*Note: I'm writing JavaScript in ES6 and CSS in SCSS. I compile my code anyway so this makes it easier for me to work with.*

## Inspiration

It's no secret that I have been **heavily** inspired by  the game [Firewatch](https://firewatchgame.com). Firewatch is a 'walking simulator' game that came out in 2016 and was loved for its art style. Featuring a bright, layered landscape it inspired many, myself included. For several years the wallpaper of my phone automatically changed between these wallpapers based on time and weather.

When planning a new site, that kept coming to mind and ended up being what the entire website was centered around. I wanted it to feel interactive, and parallax felt like a natural way to do that.

## The Markup

My landscape was produced by my wonderful sister [Becci Shepherd](https://beccishep.co.uk), and was provided to me as a raster PNG for each layer. Although I experimented with masking, it didn't have the browser support I needed. SVGs were the obvious choice.

To convert to vector I used [Vector Magic Desktop Edition](https://vectormagic.com/desktop). It does a brilliant job of anything you throw at it, and despite it's age is the best raster to vector converter I've found.

I tidied up the paths in a graphics program; exported it to SVG; tidied up the markup and optimised with [SVGOMG](https://jakearchibald.github.io/svgomg/). I was left with a reasonably-sized SVG for each layer. Note that when exporting it will make sizing much easier if all layers have an identical viewbox.

Now in HTML, we need to stack them:

```html
<div class="landscape" role="img" aria-label="This is equivalent to an img alt attribute.">
  <div class="landscape__layer">
    <div class="landscape__image">
      <svg viewBox="0 0 4000 1000" xmlns="http://www.w3.org/2000/svg">...</svg>
    </div>
  </div>
	<div class="landscape__layer">
    <div class="landscape__image">
      <svg viewBox="0 0 4000 1000" xmlns="http://www.w3.org/2000/svg">...</svg>
    </div>
  </div>
	<div class="landscape__layer">
    <div class="landscape__image">
      <svg viewBox="0 0 4000 1000" xmlns="http://www.w3.org/2000/svg">...</svg>
    </div>
  </div>

  ... and so on.
</div>
```

*Note: remember accessibility! Despite being a whole bunch of markup, this is really a fancy image so we use* `role="img"` *and* `aria-label` *to make it accessible.*

I originally didn't have the two wrapping divs, however realised that having wrappers for each layer allowed me to use flexbox, making positioning the SVGs easier:

```scss
// wrapping landscape
.landscape {
	background: var(--c1);
	height: 75vh;
	overflow: hidden;
  position: relative;
}

// make each layer fill parent
.landscape__layer {
	height: 100%;
	left: 0;
	position: absolute;
	top: 0;
	width: 100%;
}

// svg wrapper
.landscape__image {
	// position at bottom of element in center
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);

	// set sizes that work for my image
	max-height: 100%;
	max-width: 300%;
	min-width: 100%;
	width: 2500px;

	// use flexbox to center SVG elements
	display: flex;
	flex-direction: column;
}

// basic styling for SVG element
.landscape__image svg {
	display: block;
	height: auto;
	max-width: 100%;
}
```

We now have a static landscape and are set up to start making it more dynamic!

{% CodePen "https://codepen.io/accudio/pen/eYBYEWz" %}

## Parallax Animation

### Perspective and translateZ

There are two popular methods to implement parallax on the web. The more performant implementation is a CSS-only solution using the `perspective` CSS property with `translateZ()`. This is what browser vendors and devs focusing on performance will suggest, as it allows the browser to handle everything and to render it using the GPU. That makes it super quick and smooth and is how I tried to implement it for weeks.

Google Developer docs have a [good example of this implementation](https://developers.google.com/web/updates/2016/12/performant-parallaxing).

However, although it's great for a simple implementations—I found that in my case it was unreliable. This was because:

- Browser implementations vary. Chrome handles a deep 3D perspective easily, but Firefox interprets the spec differently. This meant I had to apply `transform-style: preserve-3d` on every element between my scroll element and my layers.
- Firefox on Android works inconsistently with deep DOM trees, and not with the structure I wanted.
- Mobile Safari on iOS has quirks, has removed it in the past, and the current solution is to use a trick which 'reverses' the parallax direction. Not an option in my case as that would break the effect!

I spent about two weeks trying to get this working on every browser I tried before giving up and going for method two.

### JavaScript parallax

JS-based parallax has had a bad rep in the past as a few implementations were large and not performant or accessible.  This was to deal with browser inconcistencies, but with modern CSS and JavaScript we can do it ourselves without much work.

With CSS custom properties and calc() we can come with a light and simple implementation ourselves. In JavaScript we use `window.requestAnimationFrame` and if the scroll position has changed we set it to a custom property on `html`.

The JS:
```js
// constant elements: your main scrolling element; html element
const scrollEl = document.documentElement
const root = document.documentElement

let scrollPos

// update css property on scroll
function animation() {
  // check the scroll position has changed
  if (scrollPos !== scrollEl.scrollTop) {
    // reset the seen scroll position
    scrollPos = scrollEl.scrollTop
    // update css property --scrollPos with scroll position in pixels
    root.style.setProperty('--scrollPos', scrollPos + 'px')
  }

  // call animation again on next animation frame
  window.requestAnimationFrame(animation)
}

// start animation on next animation frame
window.requestAnimationFrame(animation)
```

That's it. That's all the JavaScript we need. As one of the few developers who **loves CSS** it feels great knowing that we can keep the JS simple and use CSS to implement this *descriptively*.

Okay the real action is happening in the CSS, here is what we need to add to our previous styles:

```scss
.landscape__layer {
	// parallax
	transform: translateY(calc(var(--scrollPos, 0) * var(--offset, 0)));

	@media (prefers-reduced-motion: reduce) {
		transform: translateY(0);
	}
}
```

The key line here is that transform line and it's custom properties. What we are doing here is translating the layer vertically a certain amount based on the scroll position.

We use a `prefers-reduced-motion` media query to remove the parallax effect for those who might get motion-sick or prefer less movement in their browsing.

The `--offset` property is a value that would be between 0 and 1, and changes how much that layer scrolls. Let's look at what happens when we vary that property and scroll down by `100px`:
- `--offset: 0` — the element isn't translated and scrolls as normal;
- `--offset: 0.5` — the element will be translated down by `50px`. This makes it look like it's only moved `50px`;
- `--offset: 1` — the element is translated down `100px`, it's in the same place it used to be. This makes it look like it's not moving with scroll;

That `--offset` is the key to our parallax system. If each layer has a different value then it will scroll a different speed from the other layers. We can choose how much each layer will scroll so it looks natural.

The way we apply this to our layers is using the style property. This way we don't need to add any CSS, no matter how many layers we have. We set the front layer to 0 so it scrolls normally with the content, and increase it with each layer. This is what worked for my image:

```html
<div class="landscape" role="img" aria-label="This is equivalent to an img alt attribute.">
	<div class="landscape__layer" style="--offset:0.96">...</div>
	<div class="landscape__layer" style="--offset:0.92">...</div>
	<div class="landscape__layer" style="--offset:0.9">...</div>
	<div class="landscape__layer" style="--offset:0.86">...</div>
	<div class="landscape__layer" style="--offset:0.83">...</div>
	<div class="landscape__layer" style="--offset:0.8">...</div>
	<div class="landscape__layer" style="--offset:0.75">...</div>
	<div class="landscape__layer" style="--offset:0.4">...</div>
	<div class="landscape__layer" style="--offset:0.2">...</div>
	<div class="landscape__layer" style="--offset:0">...</div>
</div>
```

Notice the big gap between 0.4 and 0.75. If you look at the landscape structure, the loch is a lot further away than the trees, hence the offset is a lot further away from 0.

## Result

And here we have our final parallax landscape!

{% CodePen "https://codepen.io/accudio/pen/ExNxXrP" %}

Thank you for reading, next up we're going to take this landscape and add colour schemes - including one that matches the visitors local time!
