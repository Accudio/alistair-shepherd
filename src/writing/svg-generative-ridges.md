---
title: SVG generative mountain ridge dividers
date: '2022-04-21'
excerpt: "Generative mountain ridge dividers using videogame terrain generation techniques, JavaScript and SVG"
metaDesc: "Generative mountain ridge dividers using videogame terrain generation techniques, JavaScript and SVG"
tags:
- JavaScript
- SVG
- My site
---

This is another post about the build of this website. Check out the other posts in the [my site tag](/writing/tag/my-site/).

Today, I wanted to write a little about the section dividers used on my site. These ones:

{% renderTemplate 'njk' %}
<div class="gap-bot-300 flow-space-major" style="grid-column: 1/-1;">
<div class="relative bg-mid" style="min-height:5rem">{% divider 'color-mid' %}</div>
<div class="relative">{% divider 'color-dark' %}</div>
</div>
{% endrenderTemplate %}

If you've done any game development they may seem familiar, they're nothing particularly new! They are however a neat thing you can do with SVG and I love those!

For people who just want to dig into a demo, here you go!

{% CodePen "https://codepen.io/accudio/pen/VwyRjaj" %}

If you want more of an explanation then here we go!

## Idea: Interesting section dividers

You may have noticed, but this website has a bit of a theme. Pat yourself on the back if you guessed that it's a mountain/landscape theme.

The header and colour changes were the entire basis for my new site, and the colour scheme was to be very simple but impactful. It felt fairly natural that the background of page section should vary between different colours within the theme to separate them. What didn't feel natural though was the hard straight line between them. I played around with curved lines, skewed them, added wobble, but none seemed to feel quite right.

At this point my sister suggested I use a mountain ridge, matching the style of the header. I initially produced a simple SVG manually and inserted it between each section.

I liked how this looked, but when two were visible on screen at once it looked a bit silly them being identical (recreation below).

<img class="measure-long" src="{% src 'dividers-matching.jpg', 820 %}" srcset="{% srcset 'dividers-matching.jpg' %}" sizes="{% sizes [ '(min-width: 52rem) 800px', 'calc(100vw - 2.66rem)' ] %}" alt="Two matching hilly dividers, either side of content. Looks a bit weird" width="1396" height="523" loading="lazy">

I didn't really want to manually create more, although it would have been a quick workaround it didn't feel like it was really a solution. My temporary solution was to manipulate the one I did have, using `transform` to flip, rotate or scale it so it looked slightly different each time.

<img class="measure-long" src="{% src 'dividers-matching-fix.jpg', 820 %}" srcset="{% srcset 'dividers-matching-fix.jpg' %}" sizes="{% sizes [ '(min-width: 52rem) 800px', 'calc(100vw - 2.66rem)' ] %}" alt="Two matching hilly dividers, either side of content. The top one has been flipped and rotated, but still looks a bit weird" width="1396" height="523" loading="lazy">

It bugged me that my site just had the one ridge design, but I didn't really like any of the solutions I came up with.

## Terrain Generation

Some time later, I read an article from the Joy of Computing newsletter about terrain generation in game development. I really like the Joy of Computing, although I don't have much time for keeping up with the wider programming industry, their newsletters are cool projects or posts about different areas I don't normally follow like Game Development, DevOps, Hardware or Networking to name a few.

Although the post was not really relevant to me, it made me realise that terrain generation was exactly what I needed! A method to create unique 'ridges' generated every time I needed a new divider.

## Working with points

The output format was pretty easy, it had to be SVG. That way I could generate it ahead of time and embed it in the document and not need to rely on client-side JavaScript or outputting a large image file. For my use-case I basically needed a shape with variable top and cover the below area to match the background colour.

I needed a way to convert however I generate the points of the line to an SVG `path` format. My input array in most cases was in the format `[ [ x, y ], ... ]`, acting as a programmatic dot-to-dot. Turns out that although the `path` syntax seems a bit complex, when you're building it ends up making a lot of sense. SVG has different 'commands' which do certain things with a few parameteres. Check out the path syntax on MDN for them all, but we're mostly interested in `L` which draws a line to the specified absolute point. With a `viewBox` that matches our generation coordinate system we can convert it like so:

```js
// convert points into SVG path
function convertPath(width, height, points) {
  // add first M (move) command to go to the first point
  const first = points.shift()
  let path = `M ${first[0]} ${first[1]}`

  // iterate through points adding L (line) commands to path
  points.forEach(val => {
    path += ` L ${val[0]} ${val[1]}`
  })

  // close path down from the last point to bottom-right, bottom-left, then back to start
  path += ` L ${width} ${height} L 0 ${height} Z`

  return path
}
```

## Attempt 1 &mdash; Random

In my keenness, I jumped straight in with my first thoughts. I use `Math.random` to work out where the next position is and keep going until I've done the whole width:

{% CodePen "https://codepen.io/accudio/pen/qBpvNYN" %}

Ah. Not quite what I was going for, less like a mountain ridge and more like a bed of nails. Maybe the issue is that I'm used fixed intervals, so I tried random intervals too:

{% CodePen "https://codepen.io/accudio/pen/vYpPKaJ" %}

Yeah, that looks really cool! Not what I'm wanting though - it has too much randomness and most of the time it just doesn't make sense.

## Attempt 2 &mdash; Midpoint Displacement

After my first attempt, I actually did some research on terrain generation. I wanted something very simple I could implement myself in JavaScript and very fast.

I discovered the Midpoint Displacement Algorithm which seems to fit the bill perfectly. It's a simple algorithm and isn't very often used in modern games thanks to a lack of sudden steep inclines, overhangs and such, but for a mostly rolling ridge as I wanted it's perfect.

A short summary is how it works is by drawing out a straight line, and then splitting it into two segments at the midpoint. We then take that midpoint and 'displace' it&mdash;move it upwards or downwards&mdash; by a random amount. We then take the two segments and do the same thing, splitting them in two on a midpoint and displacing that midpoint. Each iteration, we reduce the amount each midpoint can move so as the segments get smaller we get finer and finer detail.

If you're interested in the theory behind it or the implementation I would recommend reading ["Landscape generation using midpoint displacement" by Bites of Code](https://bitesofcode.wordpress.com/2016/12/23/landscape-generation-using-midpoint-displacement/). This is a great article about implementing this in Python, and it explains whats happening and why really well. I found it when I was implementing it myself, and most of my code is a JS adaptation of their Python code.

I made a few tweaks and voila! Check out the demo for the code and result:

{% CodePen "https://codepen.io/accudio/pen/VwyRjaj" %}

This works really well, and generates extremely quickly. You can play with the variables at the top of the file to change the dimensions, fiedlity and roughness.

By running the output SVG through SVGO it ends up being pretty small too! This is exactly the method you see around my site at the time of writing.

## Attempt 3 &mdash; Noise?

I did make a third attempt, using Simplex noise to generate a terrain map with higher fidelity, cliffs, overhangs and flatter regions. I didn't get very far with it however, as I didn't particularly like the effect for the divider&mdash;it pulled away too much attention. It was also significantly slower to generate the SVG was quite a lot larger so I ended up ditching it and sticking with attempt 2.

It is very fun to play with terrain generation though so I'd love to play with this some more in future!

## Conclusion

Here's the final demo of the divider, as used on my site:

{% CodePen "https://codepen.io/accudio/pen/VwyRjaj" %}

I implemented this server-side with [an Eleventy Shortcode](https://github.com/Accudio/alistair-shepherd/blob/main/src/_includes/utils/shortcodes/divider.js), but as it's JavaScript you could easily use it on the client instead. That's what I've done in the demos throughout this post.

There are so many examples of where web designers and developers can learn from game design and development. Video games have so many examples of unique, creative and interesting challenges and solutions in their design and development that we could learn from. This is definitely a case where a fairly standard technique used by game developers can be used for creative result on the web.

Now go have a play and implement something like this yourself! Look at any games you play, or find out a little bit about an industry you aren't as familiar with and see if there's anything you can learn from to make more creative and cool websites!
