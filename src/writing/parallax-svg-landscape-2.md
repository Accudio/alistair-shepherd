---
title: SVG Landscape with live colour theming - new site part 2
date: '2021-02-17'
excerpt: "'Live' colour-changing landscape using custom properties for an SVG landscape."
metaDesc: "'Live' colour-changing landscape using custom properties for an SVG landscape."
tags:
- CSS
- JavaScript
- Animation
---

As promised, now we're going to dig into the colour-changing effects of my new website. If you haven't seen it, check out my previous post about the [SVG parallax effect in the landscape](/writing/parallax-svg-landscape-1/).

If you haven't tried it yet, visit my website and click the "paint bucket" icon in the top-right of my website to see the theme picker. Here you can change the colour scheme of the website.

There are four 'static' colour schemes of 'Sunrise', 'Day', 'Sunset' and 'Night'. These set the colours to a specific palette.

I implemented two special 'dynamic' colour schemes, the default of 'Live' and 'Cycle'. Live sets the colour scheme of the website to roughly match your local time, whilst Cycle is a 60 second loop animating through the four static schemes above.

The main point of this post is the colour changing functionality, but I'll briefly mention the 'Sun' animation too.

If you want straight at the code, enjoy! 👋

{% CodePen 'https://codepen.io/accudio/pen/GRNmbjJ' %}

*Note: This post is more technical and less visual than my previous one. There aren't many demos, and it's mostly code snippets from here on. You've been warned!*

## Background

I have wanted to implement a 'live' functionality in my personal website for a few years. Something that makes my site feel more current and that evolves with the day excited me.

My first attempt at this was in my previous site, where I had a background video of a stream on the Isle of Skye. This was a simple 30s loop, but what I wanted was a 24-hour video that would be synced up with your local time. I liked this idea, but it was impractical thanks to the difficulty in getting 24 hours of consistent footage. It also turned out to be a pretty major technical challenge, I had no experience of streaming video and [HLS](https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/Live_streaming_web_audio_and_video#hls) and [DASH](https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/Live_streaming_web_audio_and_video#mpeg-dash) weren't widely supported.

When I came up with the idea of the SVG landscape, this seemed like a perfect accompaniment. I could make the time in the 'scene' match up with your local time and demonstrate that through the colours and sun.

Initially I implemented a prototype of this with [anime.js](https://animejs.com)—a great JS animation library. When I boiled down the essential elements however, the problem was a lot simpler than I thought. There's more JavaScript here than my previous post but stick with me!

## Static Custom Properties

We are starting from the final CodePen in my previous post. First let us set up our colours in custom properties:

{% CodePen 'https://codepen.io/accudio/pen/JjbNQXw' %}

As we are going to be using JavaScript to 'enhance' this with the colours of our animation, we're starting with greys that roughly match the tone of our colours.
This helps us in a couple different situations:
- If the visitor has JS disabled or our JS doesn't load, we can be sure the colour contrast is sufficient and the site accessible.
- For performance reasons, we don't want to include our JS blocking the render in the `<head>`. That means that for a brief period our fallback colours might be displayed before the JS kicks in. By choosing neutral greys it looks more natural than going from one colour to another—like the saturation is turned up from 0.

## Colour Config

So we can access them with JS later, I'm configuring my colours in the JS:

```js
const config = {
	states: [
		{
			at: 0,
			name: 'night',
			colours: {
				c0: '#7da5d5',
				c1: '#0c4e8f',
				c2: '#00101f'
			}
		},
		{
			at: 6,
			name: 'sunrise',
			colours: {
				c0: '#fed4d5',
				c1: '#a496c4',
				c2: '#2e2c3f'
			}
		},
		{
			at: 12,
			name: 'day',
			colours: {
				c0: '#ffe2a6',
				c1: '#fc813a',
				c2: '#2f1121'
			}
		},
		{
			at: 18,
			name: 'sunset',
			colours: {
				c0: '#ffad39',
				c1: '#e17b17',
				c2: '#1e0000'
			}
		}
	]
}
```

We'll add to this later, and the `at` property will become more clear with more code below. We are defining an array of different themes, giving each a name so we can look them up later, and defining our colour palette.

My website has 10 unique colours, I have reduced it to 3 in code snippets for simplicity. If you're interested in all 10 have a look at the CodePens!

## Animating Custom Properties

In CSS we have the `animation` and `transition` properties. These help us animate between two values without needing JS. We should be able to use that to animate our custom properties right? Unfortunately, not right.

As great as custom properties are, at the moment they have limits. One of those limits is in animation or transitions. At the moment custom properties are strings, so the browser transition engine can't know how to *interpolate* between two values when they change.

This is one of the things that the [Houdini Project](https://developer.mozilla.org/en-US/docs/Web/Houdini) is designed to solve, but it is currently Blink-only so that's not well-supported enough for us at the moment. The idea is you specify exactly the type of value a property represents (eg, colour) and the browser can handle interpolating it.

## The Animation

I found it difficult to tutorial-ise the animation JS so what  I'm going to do is include my commented code. Feel free to go back to the CodePen above and have a dig around yourself, or get in touch if you have any questions!

```js
// Configuration of colours and animation states
const config = {
	// sets the setInterval interval and the progress function for each animation mode
	anims: {
		live: {
			// A high interval as live changes very infrequently.
			interval: 60000,
			getProgress: now => {
				// Current seconds elapsed this day, divided by number of seconds in the day
				const time = (now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds()
				return time / 86400
			}
		},
		cycle: {
			// A low interval as cycle changes in milliseconds.
			interval: 50,
			getProgress: now => {
				// Current milliseconss elapsed this minute, divided by number of milliseconds in a minute
				const time = (now.getSeconds() * 1000) + now.getMilliseconds()
				return time / 60000
			}
		}
	},
	// States with 'at' specifying the time in hours the state should be.
	// 'name' allows referring to it when we add themes later.
	// 'colours' is object with key as custom property name and value as colour.
	states: [
		{
			at: 0,
			name: 'night',
			colours: {
				c0: '#7da5d5',
				c1: '#0c4e8f',
				c2: '#00101f'
			}
		},
		{
			at: 6,
			name: 'sunrise',
			colours: {
				c0: '#fed4d5',
				c1: '#a496c4',
				c2: '#2e2c3f'
			}
		},
		{
			at: 12,
			name: 'day',
			colours: {
				c0: '#ffe2a6',
				c1: '#fc813a',
				c2: '#2f1121'
			}
		},
		{
			at: 18,
			name: 'sunset',
			colours: {
				c0: '#ffad39',
				c1: '#e17b17',
				c2: '#1e0000'
			}
		}
	]
}

const root = document.documentElement

// This changes the interval and progress calculation between
// our dynamic animations 'live' and 'cycle'.
let animMode = 'live'

// Add first element of states to end so we have a seamless loop:
// night > sunrise > day > sunset > night
config.states.push({
	...config.states[0],
	name: 'end',
	at: 24
})

// Declaring our animation loop in a variable allows us to end it when needed.
let animation
function startAnim() {
	// Run our update loop immediately after starting.
	updateAnim()

	// setInterval runs our update loop with a predetermined interval
	// based on the animation mode we are using.
	animation = setInterval(updateAnim, config.anims[animMode].interval)
}

// If we need to end the animation, this function will stop it
// running again using clearInterval
function endAnim() {
	clearInterval(animation)
}

// This runs every update cycle, getting the progress, calculating
// the right colours and applying them to the root element
function updateAnim() {
	// Get the progress through the animation. getProgress returns a number between 0 and 1.
	// To simplify working with time, we multiply this by 24 to get progress through the day.
	const progress = getProgress() * 24

	// Find the next 'state' we are transitioning to based on the 'at' property.
	// The 'at' property sets at what hour that state should be at.
	const nextIndex = config.states.findIndex(frame => {
		return frame.at !== 0 && progress < frame.at
	})
	// The previous 'state' is the one before the next one, so we remove 1.
	const lastIndex = nextIndex - 1

	// Get the onjects for the last and next states
	const lastState = config.states[lastIndex]
	const nextState = config.states[nextIndex]

	// Calculate the difference between the 'at' values of the previous and last states,
	// so we can get our progress between them based on the progress we got above.
	const diff = nextState.at - lastState.at
	const progressCurr = (progress - lastState.at) / diff

	// Loop through all the colours. 'key' is the cutsom property name
	Object.keys(lastState.colours).forEach(key => {
		// We use hex codes for colours for convenience, but it's a lot easier to transition
		// seperate Red, Green, Blue values so we convert them to a [R, G, B] array
		const lastRGB = hexToRgb(lastState.colours[key])
		const nextRGB = hexToRgb(nextState.colours[key])

		// Get the new RGB by using 'lerping' to find the value between the last and next
		// colours based on how far we are through the current animation.
		// The lerp function doesn't necessarily return an int so we round it.
		const currRGB = [
			Math.round(lerp(lastRGB[0], nextRGB[0], progressCurr)),
			Math.round(lerp(lastRGB[1], nextRGB[1], progressCurr)),
			Math.round(lerp(lastRGB[2], nextRGB[2], progressCurr))
		]

		// Apply the custom property to root using the name and our new RGB value.
		applyColour(key, currRGB)
	})
}

// As we have two different animation 'modes', we change the function used to work
// out the progress depending on that mode. See the config above for how they work.
function getProgress() {
	const d = new Date()
	const progress = config.anims[animMode].getProgress(d)

	return progress
}

// A slightly bewildering regular expression that turns a hex code into [R, G. B] array.
// Well-tested though so I don't need to touch it!
function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
	return result ? [
		parseInt(result[1], 16),
		parseInt(result[2], 16),
		parseInt(result[3], 16)
	] : null
}

// Using 'linear interpolation' gets the value between the start and end values based on progress
function lerp(start, end, progress) {
	return (1 - progress) * start + progress * end
}

// Uses name of custom property 'key' and [R, G, B] array and applies to root element
function applyColour(key, colour) {
	const colourString = 'rgb(' + colour.join(',') + ')'
	root.style.setProperty('--' + key, colourString)
}

// Round number to 'places' number of figures after decimal.
function round(num, places) {
	const power = Math.pow(10, places)
	return Math.round(num * power) / power
}

// Initialise and start animation.
function init() {
	startAnim()
}
init()
```

## Theme Picker

With the above code, we have an animated live colour scheme and the flexibility to extend it further. Let's do just that by creating methods to switch between 'dynamic' schemes and our named states.

We'll go through the basic code to change, and then a basic 'theme picker'.

### Switching between dynamic states

In our configuration, we have set the progress function and interval for each dynamic theme. When we start the animation and when our `updateAnim()` function run, they use the value of `animMode` to choose the correct interval and progress function for the current mode.

This means all we need to do is stop the animation, change `animMode`, and start it again. For example to change to 'cycle':

```js
endAnim()
animMode = 'cycle'
startAnim()
```

And likewise, to switch to 'live', we would do the same process but instead set `animMode` to 'live'.

### Switching to a static 'named' state

We included the name property within our state so that we can refer to it when setting the theme. First we need to stop the animation, so that the dynamic state doesn't replace our changes when it next runs. Then, we need to find the colours for the state we would like to apply and apply them. We can do that with this short piece of code.

```js
const theme = 'sunset'
endAnim()
const state = config.states.find(item => item.name === theme)
Object.keys(state.colours).forEach(key => {
	applyColour(key, hexToRgb(state.colours[key]))
})
```

Line 3 uses the handy Array method 'find' which will return the item that matches our condition: where `item.name` equals our theme name.
We then loop through all the colours of that state and apply them as we did for our dynamic 'themes'.

### Theme Picker

It's worth building out a theme picker for yourself, but here's a simple implementation to get us started:

```html
<button data-active aria-pressed data-theme="live">Live</button>
<button data-theme="cycle">Cycle</button>
<button data-theme="sunrise">Sunrise</button>
<button data-theme="day">Day</button>
<button data-theme="sunset">Sunset</button>
<button data-theme="night">Night</button>
```

```js
const themes = document.querySelectorAll('[data-theme]')
if (themes) {
	themes.forEach(function(theme) {
		theme.addEventListener('click', function(e) {
			// remove active state from old theme buttons
			themes.forEach(theme => {
				theme.removeAttribute('data-active')
				theme.removeAttribute('aria-pressed')
			})

			// add active state to clicked button
			this.setAttribute('data-active', '')
			this.setAttribute('aria-pressed', '')

			// get slug for current theme
			const themeSlug = this.getAttribute('data-theme')

			// end animation
			endAnim()

			// if dynamic theme, set animMode, start animation and return
			if (themeSlug === 'live' || themeSlug === 'cycle') {
				animMode = themeSlug
				startAnim()
				return
			}

			// find theme state and apply the colours
			const state = config.states.find(item => item.name === themeSlug)
			Object.keys(state.colours).forEach(key => {
				applyColour(key, hexToRgb(state.colours[key]))
			})
		})
	})
}
```


## Sun Animation

The final piece to our landscape is a moving sun. You would have thought it would be easy to implement, but it turned out to be more tricky than I first thought.

Lets go over our requirements:

1. A small circle that is on the far left at 6, top at 12, right at 18, and bottom at 24.
2. Respects screen width so it works for wide and narrow screens.
3. Respects screen height so it is positioned in the right place compared to the landscape.
4. Follows an ellipse based on the width and height

Due to all these reasons, my first thought of using animations becomes hard to implement. Respecting width, height and following an ellipse though sounds like a tricky challenge.

The solution ends up using our favourite feature the Custom Property, and exploiting the relationship between ellipses and the Sin function.

We can continue to keep our JavaScript minimal and respect the screen size by using transforms and elements the size of the screen. To our .landscape from the previous post:

```html
<div class="landscape__sunWrap">
	<div class="landscape__sun"></div>
</div>
```

```scss
$sun-size: min(4rem, 10vw);
$sun-movement-v: 30%;
$sun-movement-h: 40%;

.landscape {
	&__sunWrap {
		$distance: 10;

		bottom: 10%;
		height: 75%;
		left: 0;
		position: absolute;
		transform: translateY(var(--scrollPos, 0));
		width: 100%;

		@media (prefers-reduced-motion: reduce) {
			display: none;
		}
	}

	&__sun {
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		transform:
			translateX(calc(#{$sun-movement-h} * var(--sun-h)))
			translateY(calc(#{$sun-movement-v} * var(--sun-v)));
		width: 100%;

		// the actual sun element
		&::before {
			background: #fff;
			border-radius: 50%;
			content: '';
			height: $sun-size;
			left: 50%;
			position: absolute;
			top: 50%;
			transform: translate(-50%, -50%);
			width: $sun-size;
		}
	}
}
```

Using this code the positioning of our sun is based on rails, constrained by the size of our landscape. `--sun-h` and `--sun-v` are numbers between -1 and 1 which are used in the `calc` within our `transform` property to set how far up/down and left/right the sun is.

The advantage of using an element filling our landscape means that as the element is narrower, the less the sun moves horizontally. This leaves us with minimal JS:

```js
function sunPos(progress) {
	const sunWrap = document.querySelector('.landscape__sunWrap')
	if (sunWrap) {
		const sunH = -Math.sin(2 * Math.PI * progress / 24)
		const sunV = -Math.sin(2 * Math.PI * (progress - 6) / 24)
		sunWrap.style.setProperty('--sun-h', round(sunH, 3))
		sunWrap.style.setProperty('--sun-v', round(sunV, 3))
	}
}
```

This involves maths that I'm pretty sure I was taught in High School and University, but I am certain I have almost entirely forgotten! For a square element, this would create a circular movement but by splitting it up into separate components we have our ellipse.

We then run `sunPos` with our progress in our `updateAnim()` function and using the `state.at` property after setting a static theme.

## Conclusion

If you've gotten this far, congratulations and thank you for sticking with me! Here's our final landscape, as above:

{% CodePen 'https://codepen.io/accudio/pen/GRNmbjJ' %}

This is not the easiest post to read by any stretch of the imagination, but I wanted to get down a lot of info and I struggled to in a way that felt natural. Initial drafts were tutorial-like before I realised I was writing a 10,000 word tutorial!

I am planning to write more, but will be making them shorter and simpler than this one.
