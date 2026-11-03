---
title: Interop Priority Ranking 2027
date: '2026-11-03'
excerpt: Ranking the proposals for the Interop Project 2027 based on my work using Firefox's ranking tool
metaDesc: Ranking the proposals for the Interop Project 2027 based on my work using Firefox's ranking tool
tags:
- CSS
- Accessibility
- Browsers
---

It's once again our favourite season and holiday of the year... prioritisation and planning for the Interop project! Wait, did you think I'd say something else?

The Interop project is to allow browser vendors to get input on what they should work on standardising each year. Here's the description I gave [when I ranked proposals back in in 2023](/writing/interop-priority-game):

> The Interop Project is an collaboration across the browser communities to focus on making various web APIs interoperable, standard, and bug-free across the Blink, Webkit and Gecko engines. It's been very productive over the past few years to fix interop bugs and to release new features like container queries and subgrid in a co-ordinated way.
>
> Each year, the Interop Project accepts proposals for what should be included in the project, and once whittled down carefully considers how to prioritise working on these various important or exciting proposals.

You can use the [2027 Web Platform Feature Ranking](https://interop-rank.fxdx.dev) tool from the fine folks at Firefox to rank them, which makes it super easy. Add the ones you like the sound of to your list, then decide which you prefer in head-to-heads to rank them. I love ranking things so I had a great time with this.

## My top fifteen interop proposals

I ended up having 34 proposals that I was interested in, so here's my top 15 ranked and then I've put the rest below as 'Honourable mentions'. Previously I noted ones that were popular but not a priority for me, but this year I've mentioned most of the biggies.

My order comes from my personal priorities, which mostly consists how big of impact they would have on the type of websites I build. So new CSS things that help a lot over JS alternatives, making Accessibility and Performance easier, and simplifying front-end code. I don't know all the proposals super in-depth but I think enough to make a quick judgement of "oh yeah I want that".

There are over 100 proposals in total and so many of them seem like they would be useful — it makes ranking them tricky! The tool makes it easy though so go away and make your own list to help the prioritisation!

### 1. [JavaScript `Temporal`](https://github.com/web-platform-tests/interop/issues/1381)

A better way of working with dates and times on the web. I hate having to install a date and time library any time I want to do mildly complex stuff with dates or times.

Very much needed!

### 2. [Customizable/stylable `<select>`](https://github.com/web-platform-tests/interop/issues/1393)

You can do some insanely cool stuff with customisable select. Some really awesome ways of selecting something with better UX and accessibility than would be possible otherwise.

Probably in practice I would just use it to make the native select match the brand guidelines so a client or designer doesn't demand a custom select library just to change the padding by like 0.25rem or something.

Either way, big win for the web.

### 3. [CSS `margin-trim`](https://github.com/web-platform-tests/interop/issues/1444)

This is something I run into quite often — you want the actual visible text of a heading to line up with an accompanying image or graphical element. But the damn font metrics are off which means you have to do something stupid like `margin-top: -0.1em;`.

This makes that situation much easier as you can easily make the bounding box match the rendered text which in my experience is what you actually want in many cases.

### 4. [CSS `flex-wrap: balance`](https://github.com/web-platform-tests/interop/issues/1350)

Avoids orphans in flex layouts which can be a bloody pain to handle manually. You've got a 3 column layout and four items, that looks shit. But what if it could automatically become 2 columns? Still shit but now I can blame myself instead of the browser.

Without `flex-wrap: balance` I'd be using server-side templating with `items.length % 3` and some conditional classes, or use client-side JS and cause a layout shift when it executes. Either way it's nasty, and `flex-wrap: balance` is officially less nasty.

### 5. [Single-axis scroll containers](https://github.com/web-platform-tests/interop/issues/1436)

I swear to god it is actually insane the number of times I've had to do some awkward or stupid markup to deal with `position: sticky` and `overflow` on an ancestor. `overflow: clip` helps but sometimes you need sticky and a scroll and it's a real bitch to handle when you do.

I would like a refund on the time I've had to deal with sticky and overflow please. I promise I'll spend it on something more useful like sneering at generative art.

### 6. [Progressive rendering of JPEG XL and AVIF images](https://github.com/web-platform-tests/interop/issues/1459)

Yessss gimme gimme gimme. All I want for Christmas this year is the ability to use AVIF or JPEG XL for all my images and for them to load beautifully and work great.

Images are still a difficult part of front-end dev that almost everyone gets wrong. Any way to make that easier and make the image loading experience better is a must for me.

### 7. [CSS `interpolate-⁠size` property and `calc-⁠size()` function](https://github.com/web-platform-tests/interop/issues/1373)

`interpolate-size` is the star here. It allows for transitioning to and from `height: auto` which comes up so often in my work. I use a JS library for it each time and I can't wait to delete that import.

I've seen some cool uses of `calc-size()`, but I'm currently on a rehab plan after some particularly crazy uses of `calc()` so I don't know if I'd be rushing for it and I'm yet to see a usecase I would benefit from regularly.

### 8. [CSS linked parameters](https://github.com/web-platform-tests/interop/issues/1346)

I often end up inlining SVGs into my markup in order to use `currentColor` and custom properties to change the fill or stroke colours. I would prefer if I could leave them as external resources fetched when needed and they could use those properties. In some cases I've even resorted to generating different versions of SVGs with different fill colours so I can do just that.

With this proposal I could write `<img src="example.svg#:~:param(--color,blue)">` and it solves all of my SVG colour-related woes. Wonderful!

### 9. [Out-of-order streaming with `<template for>`](https://github.com/web-platform-tests/interop/issues/1366)

[Barry Pollard](https://www.tunetheweb.com) gave an **excellent** talk that included this at Fronteers conference which has me really excited about the possibilities for improving and refining web performance.

What stuck in my head was an example of a header with a megamenu. Until recently, I would be outputting the content of that megamenu next to where it appears. That could be several kB on a megamenu that is not visible until someone hovers over it, delaying the markup for the hero which is most of the first paint. I could use JS to render it later in the DOM and then injct it back when it's loaded, or with declarative partial updates I can do it with just a `<template>` and `<?marker>` and the browser will handle it for me.

[Barry wrote about it on the Chrome Dev blog](https://developer.chrome.com/docs/web-platform/declarative-partial-updates), but also I hope a recording comes for the Fronteers talk because it was fantastic and well worth a watch.

### 10. [CSS reading-⁠flow and reading-⁠order properties](https://github.com/web-platform-tests/interop/issues/1349)

Provides a way of layouts being less shite when the visual order on the page differs from the logical order. Most commonly when using grid and flexbox with order. Misusing order can easily make an absolute mess for people navigating with a keyboard, screen-reader, switch or other Assistive Tech.

Hopefully makes doing cool stuff with `order` less dangerous (and devs less crap at caring about logical order)! It's not perfect, but could have potentially a big impact on making accessible grids easier.

### 11. [`ariaNotify()` function](https://github.com/web-platform-tests/interop/issues/1387)

When you're getting into delivering a really good accessible experience, you may need to reach for live regions to announce a page change. These are annoying, requiring injecting content into a pre-existing element with `aria-live` and cleaning it up later. It would be nice to have an easy JS method that lets you make an announcement in a simple way when needed. Lucky us! Not essential, but a nice tool to simplify developing accessibly.

### 12. [Element-scoped view transitions](https://github.com/web-platform-tests/interop/issues/1419)

I'm far from an expert in View Transitions (that should be a specialism in itself), but from my working with them I've found it can be a real pain to mix multiple isolated transitions on the same page, especially with JS and CSS animations going on in the same DOM tree.

From what I gather I think this will make that way easier. When we run a transition with JS that only affects a small portion of the page we can isolate it there and not need to worry about other transitions further up the tree. Seems like a big simplification!

### 13. [requestIdleCallback](https://github.com/web-platform-tests/interop/issues/1398)

Get a callback when the browser is less busy! Very helpful for something that you want to get done soon, but shouldn't be a priority. Supported in Chrome and Firefox for yonks, but on Safari we're still using something like `setTimeout(fn, 200)` instead. Get it sorted Apple!

### 14. [CSS `var()` in size container queries](https://github.com/web-platform-tests/interop/issues/1344)

Container queries are fucking sick, and one of my fave tools for making a layout that is beautiful no matter the screen shape or size. Custom properties are also sick!

Currently having to copy my properties value into the container query makes me sad 😢 because then they can't be easily updated. Being able to use properties in container queries would make me happy 😁!

### 15. [CSS gap decorations](https://github.com/web-platform-tests/interop/issues/1374)

I can't remember when I last needed to fill a gap in a grid with a rule or some kind of decoration. But I do remember that when I did I swore a lot and did some horrible grid using extra columns and psuedo elements instead of a gap, and for that code I am presumably going to hell.

If this isn't a thing when that situation comes up next I can't be held responsible for my actions.

## Honourable mentions

Proposals that also look good and I would love, but are less of a priority for me. I've added some brief thoughts on each and why they aren't as high priority for me.

- [CSS scroll-triggered animations](https://github.com/web-platform-tests/interop/issues/1433) — a small script with `IntersectionObserver` can achieve what I would use this for in 99% of circumstances so whilst cool it's not a huge priority for me.
- [Allow CSS transitioning/animating `display` and `content-⁠visibility`](https://github.com/web-platform-tests/interop/issues/1384) — sounds cool and probably useful but I don't feel limited by the lack of it.
- [Streaming HTML insertion with sanitizing](https://github.com/web-platform-tests/interop/issues/1471) — seems like there's lots of potential but lower-level than I normally work with.
- [CSS `random()` function](https://github.com/web-platform-tests/interop/issues/1354) — can't think of when I've needed this for work, but excited for some fun generative coding!
- [`LayoutShift` entries in the Performance API](https://github.com/web-platform-tests/interop/issues/1352) — measuring Cumulative Layout Shift on all browsers would be good!
- [Speculation Rules API](https://github.com/web-platform-tests/interop/issues/1335) — Cool potential here to improve performance, I'm sure I'd rate it higher if I didn't have JS alternatives that I was more used to.
- [Web app manifest `share_target`](https://github.com/web-platform-tests/interop/issues/1404) — can help make web apps more on par with native apps.
- [HTML `focusgroup` attribute](https://github.com/web-platform-tests/interop/issues/1348) — looks cool for simplifying use of a roving `tabindex` but I don't feel like I know the details well enough yet.
- [Scheduler API](https://github.com/web-platform-tests/interop/issues/1413) — makes it a bit easier to manage long-running JS tasks without causing jank or issues.
- [Responsive iframes](https://github.com/web-platform-tests/interop/issues/1443) — removes a long-term annoyance that makes iframes much less practical than they could be.
- [Additional sanitizing HTML methods and trusted types integration](https://github.com/web-platform-tests/interop/issues/1416) — `replaceWithHTML()` is going to be really useful and I have built versions myself several times.
- [DOM `moveBefore()`](https://github.com/web-platform-tests/interop/issues/1355) — helpful to be able to move an element more easily without worrying about state.
- [CSS `line-⁠clamp` property](https://github.com/web-platform-tests/interop/issues/1379) — it's possible prefixed but would be great to be standardised.
- [Multiple import maps](https://github.com/web-platform-tests/interop/issues/1399) — many webpages are not controlled by a single entity, which significantly reduces the usefulness of import maps without this.
- [CSS grid lanes (masonry)](https://github.com/web-platform-tests/interop/issues/1445) — I don't actually really like asonry layouts but we hsould have a better way of doing them than JS or hacks.
- [CSS `justify-⁠items` and `justify-⁠self` in block layout](https://github.com/web-platform-tests/interop/issues/1360) — cool, useful, but I'd probably just use a flexbox for that kind of layout.
- [HTML `headingoffset` and `headingreset` attributes](https://github.com/web-platform-tests/interop/issues/1412) — sounds interesting and I can see it being useful for component systems. A bit uncertain about the implications though.
- [CSS `if()` function](https://github.com/web-platform-tests/interop/issues/1343) — I can see it being useful but I'll be honest it feels so wrong to me. I'm too used to @rules and it being inline gives me the heebie jeebies.
- [`103 Early Hints` preloading](https://github.com/web-platform-tests/interop/issues/1400) — more potential for perofrmance optimisation is always appreciated by me.
- [CSS border-⁠shape property](https://github.com/web-platform-tests/interop/issues/1371) — seems powerful but I haven't felt a need for it recently.
