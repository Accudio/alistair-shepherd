---
title: Personal site stack for alistairshepherd.uk
date: '2021-12-23'
excerpt: "The technical stack for alistairshepherd.uk including 11ty, Sass, esbuild and gulp"
metaDesc: "Technical stack for alistairshepherd.uk including 11ty, Sass, esbuild and gulp"
tags:
- Eleventy
- Build
- CSS
- JavaScript
---

<aside class="flow-space-800 gap-bot-800 rounded pad-400 bg-dark-m1">
  <p class="gap-bot-400">I've had a very chaotic few months at the end of 2021, with work, moving house and my <a href="/speaking/jamstack-imagecdns/">first steps into giving tech talks</a>! That has meant that all the blog posts and side projects I planned were left behind, but with some free time before Christmas I thought I'd squeeze a quick and easy post out!</p>
  <p class="gap-bot-400">I hope 2021 has been kind and merciful to you, and you have a good holiday period if you're taking one! Thank you so much for reading and supporting me/my work, it means a huge amount! ❤️</p>
  <p>So I'm finishing off this year with a very festive post... my website tech stack?! 🌲</p>
</aside>

In about a month this site will be a year old! Recently a few people have asked me about the tech stack so it's about time I put it and my thinking down properly. I'm really enjoying it!

The entire build is designed to make it as easy as possible for me to work on new content and tweaks after months or years of not touching it. It's been great so far and I find it easier to work on when I come back to it than other platforms I've worked on.

## Summary / Table of Contents

Here's a TLDR if you're not interested in the reasoning:

- [Host](#hosting) &mdash; Netlify with Vercel backup ☁️
- [Static site generator](#ssg) &mdash; Eleventy 🎈🐀
- [Tasks/build](#tasks) &mdash; Gulp 🥤
- [CSS](#css) &mdash; 'Vanilla' Scss with Gorko 🎨
- [JavaScript](#js) &mdash; Vanilla JS with esbuild and Barba client-side routing ⚡
- [Media](#media) &mdash; CloudImage Image CDN 🖼️
- [Fonts](#fonts) &mdash; Red Hat Display and Literata, optimised with Glyphhanger 🕴️

## Hosting { #hosting tabindex="-1" }

For Jamstack hosting I really like [Netlify](https://www.netlify.com/). I think their product is brilliant and love how easy it makes deploying and hosting a website. It has tons of features, great documentation and I like their company ethos, principles and staff. My site is primarily hosted with them under the free plan.

However in case they have a major incident or I disagree with their direction, I have a backup copy of my site ready to go with [Vercel](https://vercel.com/). If I needed to switch to them, all I'd need to do is update the DNS and it would be done within a few hours if needed. I don't anticipate needing to, but when it's so easy and free to have a backup website I like having the option.

## Static Site Generator { #ssg tabindex="-1" }

I use [Eleventy](https://www.11ty.dev/) as my Static Site Generator (SSG) for data manipulation and HTML generation. My site is fairly simple, all I really need is handlebars-style templating, markdown support and reusable JS snippets for custom functionality.

This would give me a lot of SSG options but I had a few priorities that were important. I wanted static HTML without any client-side JavaScript, flexibility with data and structure, easily extendable with JavaScript, and to be in full control of the output. Eleventy was the ideal tool for the job here.

At the time of creation it was a year from stable release but already provided a quick, extendable platform that is easy to work on and has been more stable than at least 4 other major SSGs I've worked with!

I write my blog posts in Markdown but the rest of the site uses [Nunjucks](https://mozilla.github.io/nunjucks/) for templating.

## Tasks/build { #tasks tabindex="-1" }

I use [gulp](https://gulpjs.com/) for my build process and tasks as it provides me a lot of freedom with how I want to run tasks and implement builds.

Many people consider gulp to be dated/dead but honestly I much prefer it to many of the big 'build tools' used in development at the moment. Webpack, Rollup and Parcel seem great at first but I've had difficulties with configuration or needed to use gulp alongside them for custom processes.

A year on I would consider simplifying further and using simple node scripts instead of gulp. These would have the benefits of simplicity and stability over time&mdash;I would also appreciate fewer dependencies. For getting off the ground quickly though gulp has the edge for me, with a still huge ecosystem and so many previous projects I can pull gulp tasks from.

A key feature is I can write my own tasks in JS and don't need to prescribe to a config system. The tasks for this site are fairly standard but for long-term maintenance it's useful being able to write my own without having to learn a new 'plugin' syntax. I can also implement builds using whatever tools I like&mdash;an example being [choosing to use esbuild for JS bundles](#js).

It's not as fancy as some of the latest tools like Vite and Snowpack, but in reality I don't need HMR or instant refreshes for a simple site. And although it's not at the cutting-edge, the API and project stability is helpful for coming back to an older project.

## CSS { #css tabindex="-1" }

The CSS is mostly handcrafted without any libraries so I can have full control over the structure and performance. I write in [Sass (Scss flavour)](https://sass-lang.com/) as I'm used to many of the utilities and conveniences it provides like importing partials, concatenated nesting and variables.

I say 'mostly handcrafted' as I use the utility class generator [Gorko](https://github.com/hankchizljaw/gorko) to generate classes for spacing, sizing and colours. Utility classes are great for simple rules like changing `display` or spacing, both for convenience and performance reasons. For anything that has more than a couple utility classes though that becomes a 'layout' or 'block' that is written using BEM-like classes (eg `.nav__link`).

The structure I follow is a variation of Andy Bell's [CUBE CSS](https://cube.fyi/) with Layout, Utilities and Blocks. For performance optimisation I have a 'critical' CSS file that includes CSS important to display the top of pages correctly, and this is embedded in the `head` of every page. I use an 11ty transform with [PurgeCSS](https://github.com/FullHuman/purgecss) to strip out any unused rules for each page. This makes the first load of each page as fast as possible, and then the rest of the styles are loaded in a 'main' CSS file that is there for lower down the page and cached for subsequent navigations.

## JavaScript { #js tabindex="-1" }

As I prioritise performance, almost all JavaScript is hand-written and vanilla &mdash; no frameworks. This allows me to include only what is needed, which thanks to the capabilities of modern browsers ends up being pretty small. Not including libraries and frameworks improves performance on all devices and means my code is more maintainable in future.

I really like [esbuild](https://github.com/evanw/esbuild) for transforming source JS, it's extremely fast, very simple and the [gulp-esbuild](https://github.com/ym-project/gulp-esbuild) plugin is easy to use. I have it set up to turn a set of modules into a single bundle for performance reasons, minify for production, generate sourcemaps and transform modern syntax to a list of supported browsers.

The only library I use is [Barba](https://barba.js.org/) for Client Side Routing (CSR) to maintain the state of the landscape and themes seamlessly across pages. Although I don't normally care much for page transitions and client-side navigations, I couldn't come up with a native solution that was quick, wasn't jarring and maintained the effect. I broke my 'no libraries' rule here as client-side routing isn't easy to get right. Barba does a decent job, is fairly small and I load it separate from the main bundle with low priority to avoid a performance hit.

## Media { #media tabindex="-1" }

I'm a big proponent of using Image CDNs, it makes the build process simpler and quicker and further development easier. For more of my thoughts see my recent talk [Making Assets fly on the Jamstack with Image CDNs](/speaking/jamstack-imagecdns/).

I use [CloudImage](https://www.cloudimage.io) for this site as I like it's simplicity and the free tier is generous enough to cover my few images. The performance is good but I'd like to see better, including AVIF support. [Imgix](https://imgix.com/) and [Cloudinary](https://cloudinary.com/) both perform better but I'm happy with CloudImage for the moment.

I've written a custom Eleventy shortcode with a few parameters to generate `src` and `srcset` attributes to do what I need. This would make it easy to switch to a different provider if I wanted. To avoid the performance impact of using a different origin I [proxy CloudImage requests through Netlify using redirects](https://github.com/Accudio/alistair-shepherd/blob/92dbe295c402e4645ee463dc3e762fddfd673420/netlify.toml#L19).

## Fonts { #fonts tabindex="-1" }

I use [Red Hat Display](https://fonts.google.com/specimen/Red+Hat+Display) for titles and [Literata](https://fonts.google.com/specimen/Literata) for the body. Both are on Google Fonts and open source so I can download and manipulate them freely.

To mitigate the performance effect of custom fonts I host them myself and preload the font files. I also reduce their size by subsetting them to US ASCII characters using [Glyphhanger](https://github.com/zachleat/glyphhanger) which cuts their size almost in half. Thanks to [Andy Bell](https://twitter.com/hankchizljaw) for the font combo!

<hr class="flow-space-900 gap-bot-900">

## Conclusion { #conclusion tabindex="-1" }

I'm really happy with this stack and I'm hopeful it'll stand the test of time. My previous Next.js personal site was an absolute nightmare of dependency updates a year on from launching so we're doing better than that.

If you're interested in any specific implementations the [source code is public on GitHub](https://github.com/Accudio/alistair-shepherd). Note that it's not open-source and licensed for re-use, but if you're looking for a similar setup I'd encourage taking a look and learning from the code!

Whilst you're here check out my other posts about how I built this site, about the dynamic functionality of the landscape and colour themes:

- [Making a Parallax SVG Landscape - new site part 1](/writing/parallax-svg-landscape-1/)
- [SVG Landscape with live colour theming - new site part 2](/writing/parallax-svg-landscape-2/)

Thank you for reading, best wishes to you and yours, and take care!
