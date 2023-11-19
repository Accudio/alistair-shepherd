---
title: Interop Priority Game 2024
date: '2023-11-17'
excerpt: Prioritising the proposals for the Interop Project 2024 as I'd like, prompted by Brian Kardell's "Let's Play a Game"
metaDesc: Prioritising the proposals for the Interop Project 2024 as I'd like, prompted by Brian Kardell's "Let's Play a Game"
tags:
- CSS
- Accessibility
- Browsers
audio: '/writing/interop-priority-game.mp3'
---

The other day [Brian Kardell](https://bkardell.com/) asked about [Interop project](https://github.com/web-platform-tests/interop) prioritisation on his blog and mastodon. As he asks in his blog ["Let's Play a Game"](https://bkardell.com/blog/PriorityGame.html):

> It's Interop 24 planning time! Let's play a game: Tell me what you prioritize, or don't and why?

The Interop Project is an collaboration across the browser communities to focus on making various web APIs interoperable, standard, and bug-free across the Blink, Webkit and Gecko engines. It's been very productive over the past few years to fix interop bugs and to release new features like container queries and subgrid in a co-ordinated way.

Each year, the Interop Project accepts proposals for what should be included in the project, and once whittled down carefully considers how to prioritise working on these various important or exciting proposals.

So Brian has come up with a game! Ask developers to look through the full list, sort some of them and maybe explain a little bit of why they made the decisions they have. I found this a really interesting exercise and a great way of getting up-to-date with some of the things upcoming to the web platform. Please consider looking at the proposals, voting to what you like the look of and maybe doing your own prioritisation like this!

## My top fifteen interop proposals

My order comes from my personal priorities, which are in Accessibility, Performance, and making the kind of websites I work on easier/more fun to build. Those are mostly public, lightweight websites with a bit of creativity. I don't know all the proposals super in-depth but I think enough to make a quick judgement of "oh yeah I want that".

There are over 90 proposals in total and pretty much all of them seem like they would be useful — it makes sorting them tricky! The "game" is to prioritise them to your own order, and if you have your own opinions make your own list!

### 1. [display: contents accessibility](https://github.com/web-platform-tests/interop/issues/568)

All of the accessibility-related improvements and fixes hit the top of my list. I work in accessibility, that was always going to happen and I personally feel like stuff that is "nice to have" for developers should come after reducing barriers and making the web more accessible. This one is both nice to have and an accessibility improvement so tops the list.

`display: contents` is a very useful CSS property that allows an element to basically remove it's own element box and allow it's child nodes to participate in a higher level. That's particularly handy for wrapping an element in a semantic container—like `li`—but allowing children to sit within the grid or flex layout of the parent.

Unfortunately, it's hampered by buggy and unreliable accessibility. In several browsers using `display: contents` will remove an element from the accessibility tree and therefore is best to avoid. It's my first priority as it's a great feature that is currently unusable, and an accessibility issue.

### 2. [Accessibility issues with display properties](https://github.com/web-platform-tests/interop/issues/512)

Another accessibility one, and this is related to setting `display` properties on particular elements. In some circumstances changing the display property of certain elements can remove or break accessibility for those elements. These circumstances are all over the web, and it would be good to ensure people relying on accessibility technology aren't impacted negatively.

### 3. [Accessibility (computed role + accname)](https://github.com/web-platform-tests/interop/issues/526)

The final accessibility proposal in Brian's list, this is standardising and making accessibility roles and names more consistent. It'll make it easier to build complex interfaces in an accessible way, and improve the experience for people using accessibility technology. Sounds great.

### 4. [View Transitions Level 1](https://github.com/web-platform-tests/interop/issues/437)

View Transitions are absolutely amazing, and I think they're going to a monumental addition to the web. In short, page transitions but also so much more! Particularly for building flashy, creative websites it makes it easier to produce something that feels great without needing to ship a huge amount of JS to do so.

Now this proposal is for Level 1, so only the 'SPA API' that does same-document transitions. Cross-document transitions are in the Level 2 module which is still in draft. That said, there's a lot of amazing things you can do with the SPA API and by getting Level 1 out it'll encourage work on Level 2 and I want that as soon as possible!

### 5. [JPEG XL image format](https://github.com/web-platform-tests/interop/issues/430)

JPEG XL looks to be a fantastic upcoming image format with great high-fidelity compression, fast encoding/decoding, backwards compatibility with JPEG, and lots of great image format features that make it look like a great candidate for the canonical image format for most-use cases.

From the perspective of web performance I'm really excited for the potential of JPEG XL.

### 6. [Scroll-driven animations](https://github.com/web-platform-tests/interop/issues/439)

I've been playing with Scroll Driven animations recently and found them a great API that makes it super easy to implement really cool animations linked to the scroll, with performance that's almost impossible to achieve otherwise and only a handful of lines of CSS.

I've worked on projects with complex scroll animations that are basically impossible to maintain. The mess of timelines in JS are a nightmare, and the CSS API and use of native `@keyframe` animations is fantastic in comparison. From a performance perspective it also removes the need to reach for a 100+kB JS library for a simple scroll effect.

### 7. [Text fragments](https://github.com/web-platform-tests/interop/issues/529)

Now this one is surprisingly high! Text fragments make it possible to [link to certain text from a page and highlight it](#:~:text=Now%20this%20one%20is%20surprisingly%20high!), using a format like `#:~:text=Now%20this%20one%20is%20surprisingly%20high!`. Fairly regularly I want to link someone to a specific part of a page/article, but there are no in-built ID anchor links nearby. With this I can manually construct a URL that links straight to where I want it.

I already use it to link people who I know are using chromium-based browsers, but would love for it to be possible in all browsers.

### 8. [CSS Multi-Column Layout block element breaking](https://github.com/web-platform-tests/interop/issues/520)

I feel like issues and bugs with multi-column layout have been a constant through my career in web since Chrome added support in 2016. Every other time I try and use them I give up and instead use a less ideal Grid, Flex or JS-based layout. Or tell the designer "Sorry, the web can't do columns properly" which is completely ridiculous.

It's about time CSS multi-column is sorted so it's reliable enough to use consistently.

### 9. [Unit division and multiplication for mixed units of the same type within calc()](https://github.com/web-platform-tests/interop/issues/513)

Currently in the CSS `calc` function division can only be done by unitless numbers. If we were able to divide by value with a unit it would open the way to strip units and to compare the scale of values with different units.

This isn't one I run into often—hence it's position at 10—but there's been a handful of times it's come up as something that would make CSS SO much easier. There is a cool but nasty hack using `tan(atan2())` but otherwise the workaround are annoying and either involve duplication or JS.

### 10. [text-box-trim](https://github.com/web-platform-tests/interop/issues/422)

Text box trim allows trimming the space around text, so you can rely on padding and margins to sit flush with the text glyphs. In some designs you want a really neat alignment between a heading and graphic, currently that's tricky without resorting to fiddling with line-heights or ["magic numbers"](https://css-tricks.com/magic-numbers-in-css/).

In a design-led agency, this is definitely something our designers are looking forward to and would make heading design more flexible and easier.

### 11. [CSS style container queries](https://github.com/web-platform-tests/interop/issues/433)

If you need to change multiple properties in CSS at once with something manual, your best bet is adding or removing CSS classes. Which requires server-side or JS logic, and can get a real mess. Style container queries allows modifying CSS properties depending on the value of a single custom property. Basically a custom if statement within CSS.

This is an awesome feature and super handy. Despite that, it's lower down this list for me as it doesn't really solve problems I have with the utility-first CSS methodology I use at work.

### 12. [CSS Nesting](https://github.com/web-platform-tests/interop/issues/420)

This is another one that is super exciting for certain methodologies and ways of writing CSS, but it doesn't really match up with how I do. At work I write utility-first CSS that doesn't really benefit from nesting, and on my own projects I lean hard into BEM-style nesting which needs pre-processed. Ah, how I wish they'd added BEM-style nesting natively but no cigar.

It's extremeley powerful, a great addition to the language, and I know some people super excited for this. Maybe I will be if I have another look at how I structure CSS, but that's why it's not top of the list.

### 13. [CSS background-clip](https://github.com/web-platform-tests/interop/issues/517)

This is particularly around inconsistencies with how clipping text works with background-clip. Clipping backgrounds to text is a super neat feature that can produce some really cool looking effects, particularly combined with images. It can be pretty finicky though so it would be great if it were more consistent.

### 15. [text-wrap: pretty](https://github.com/web-platform-tests/interop/issues/562)

A way of preventing widows and generally improving readability across lines in paragraphs. Sounds good, and people who care about typography will love it. Definitely handy, I'll use it when it's available, but it's a relatively minor issue to me.

### 14. [text-wrap: balance](https://github.com/web-platform-tests/interop/issues/561)

Finally we have `text-wrap: balance`, which provides a better layout for short blocks of text considering where to break lines. Just adding it to major headings can easily make them look a little nicer. Like `text-wrap: pretty`, it'll be handy and I'll use it but I'm not clamouring for it!

## Honourable mentions

These are all on my radar and of interest, but less of a priority. That may be because I don't know enough, I don't use them, am unsure quite where to place them, or they have less convenient but full-featured alternatives:

- [requestIdleCallback](https://github.com/web-platform-tests/interop/issues/563)
- [Declarative Shadow DOM](https://github.com/web-platform-tests/interop/issues/501)
- [attr() support extended capabilities](https://github.com/web-platform-tests/interop/issues/521)
- [Web Share API](https://github.com/web-platform-tests/interop/issues/464)
- [details and summary elements](https://github.com/web-platform-tests/interop/issues/553)
- [CSS element() function](https://github.com/web-platform-tests/interop/issues/442)
- [scrollbar-width](https://github.com/web-platform-tests/interop/issues/571), [scrollbar-color](https://github.com/web-platform-tests/interop/issues/417), [scrollbar-gutter](https://github.com/web-platform-tests/interop/issues/419)
- [font-size-adjust](https://github.com/web-platform-tests/interop/issues/541), [size-adjust](https://github.com/web-platform-tests/interop/issues/542)

## Notable items low on my list

The point of the "game" is prioritisation, and I thought it would be interesting to look at what proposals are popular that I don't prioritise. Clearly lots of people want them so it's definitely not a case of them not bing valuable, just not relevant to me for whatever reason!

- [Popover](https://github.com/web-platform-tests/interop/issues/423) — honestly, I've never had difficulty implementing "popovers" and I'm not sure I love the API.
- [WebXR](https://github.com/web-platform-tests/interop/issues/522) — Nothing on the API, I've just gone off VR and never really 'got' AR.
- [Custom Media Queries](https://github.com/web-platform-tests/interop/issues/421) — I actually prefer the API of the style queries 'workaround'.
- [Allowing &lt;hr&gt; inside of &lt;select&gt;](https://github.com/web-platform-tests/interop/issues/573) — Kinda just a meh version of `optgroup`? See [Adrian Roselli's Splitting within Selects](https://adrianroselli.com/2023/10/splitting-within-selects.html)
