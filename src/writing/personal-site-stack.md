---
title: Personal site stack for alistairshepherd.uk
date: '2021-12-21'
draft: true
---

In about a month this site will be a year old! Recently a few people have asled me about the tech stack so thought it was about time I got it in writing more than a list in a tweet.

## Summary

Here's a TLDR if you're not interested in the reasoning:

- [Host](#hosting) &mdash; Netlify with Vercel backup
- [Static site generator](#ssg) &mdash; Eleventy
- [Tasks/build](#tasks) &mdash; Gulp
- [CSS](#css) &mdash; 'Vanilla' Scss with Gorko
- [JavaScript](#js) &mdash; Vanilla JS with esbuild and Barba client-side routing
- [Media](#media) &mdash; CloudImage Image CDN
- [Fonts](#fonts) &mdash; Red Hat Display and Literata, optimised with Glyphhanger

## Hosting { #hosting tabindex="-1" }

For Jamstack hosting I really like [Netlify](https://www.netlify.com/). I think their product is brilliant and love how easy it makes deploying and hosting a website, it has all the features I need and more, is well documented and I like their company ethos, principles and staff. My site is primarily hosted with them under the free plan.

However just in case they have a major incident or I disagree with their direction, I have a backup copy of my site ready to go with [Vercel](https://vercel.com/). If I needed to switch to them, all I'd need to do is update the DNS and it would be done within a few hours if needed. I don't anticipate needing to, but when it's so easy and free to have a backup website I like having the option.

## Static Site Generator { #ssg tabindex="-1" }

I use [Eleventy](https://www.11ty.dev/) as my Static Site Generator (SSG) for data manipualtion and HTML generation. My site is fairly simple, all I really need is some templating, markdown support and reusable JS snippets for custom work.

This would give me a lot of options for SSG but it was important to me that it outputted static HTML without any client-side JavaScript, was very flexible to my needs, allowed me to extend it with JS and I was in full control of the output. Eleventy was the ideal tool for the job here.

At the time of creation it was quite far from stable release but already provided a quick, extendable platform that is very easy to work on and has been more stable than at least 4 other major SSGs I've worked with!

I write my blog posts in Markdown but the rest of the site uses Nunjucks for templating.

## Tasks/build { #tasks tabindex="-1" }

I still use [gulp](https://gulpjs.com/) for my build process and tasks as it provides me a lot of freedom with how I want to run tasks and implement builds.

Many people consider gulp to be dated/dead but honestly I much prefer it to many of the big 'build tools' used in development at the moment. Webpack, Rollup and Parcel seem great at first but I've often had difficulties with configuration or needed to use gulp alongside them for some custom processes.

Now I would consider somplifying further and using simple node scripts. These would have the benefits of simplicity and stability over time&mdash;I would appreciate fewer dependencies. For getting off the ground quickly though gulp has the edge for me, with a still huge ecosystem and so many previous projects I can pull gulp tasks from.

The key thing for me is I can write my own tasks in JS and use those and don't need to prescribe to a config system. The tasks for this site are fairly standard but for long-term maintenance it's very useful being able to write my own without having to learn a new 'plugin' syntax. I can also implement builds using whatever tools I like&mdash;an example being [choosing to use esbuild for JS bundles](#js).

It's definitely not as fancy as some of the latest tools like Vite and Snowpack, but in reality I don't need HMR or instant refreshes for such a simple site. And although it's not at the cutting-edge, the API and project stability is so helpful for coming back to an older project.

## CSS { #css tabindex="-1" }

The CSS is mostly handcrafted without any libraries so I can have full control over the structure and performance. I prefer the Scss flavour of [Sass](https://sass-lang.com/) as I'm very used to many of the utilities and conveniences it provides like importing partials, concatenated nesting and variables.

I say 'mostly handcrafted' as I do use the utility class generator [Gorko](https://github.com/hankchizljaw/gorko) to generate classes for spacing, sizing and colours. Utility classes are great for simple rules like changing `display` or spacing, both for convenience and performance reasons. For anything that has more than a couple utility classes though that becomes a 'layout' or 'block' that is written using BEM-like classes (eg `.nav__link`).

The structure I follow is a variation of Andy Bell's [CUBE CSS](https://cube.fyi/) with Layout, Utilities and Blocks. For performance optimisation I have a 'critical' CSS file that includes CSS important to display the top of pages correctly, and this is embedded in the `head` of every page. I also use an 11ty transform with [PurgeCSS](https://github.com/FullHuman/purgecss) to strip out any unused rules for each page. This makes the first load of each page as fast as possible, and then the rest of the styles are loaded in a 'main' CSS file that is there for lower down the page and cached for subsequent navigations.

## JavaScript { #js tabindex="-1" }

As I prioritise performance, almost all JavaScript is hand-written and vanilla &mdash; no frameworks. This allows me to include only what is needed which thanks to the capabilities of modern browsers ends up being pretty small. Not including libraries and frameworks makes performance really good on all devices and means my code is very maintainable in future.

I really like [esbuild](https://github.com/evanw/esbuild) for transforming source JS, it's extremely fast, very simple and the [gulp-esbuild](https://github.com/ym-project/gulp-esbuild) plugin is very easy to use. I have it set up to turn a set of modules into a single bundle for performance reasons, minify for production, generate sourcemaps and transform modern syntax to a list of supported browsers.

The only library I use is [Barba](https://barba.js.org/) for Client Side Routing (CSR), mostly to maintain the state of the landscape and themes seamlessly across pages. Although I don't normally care too much for page transitions and browser navigations, I couldn't come up with a native solution that was quick, wasn't too jarring and maintained the effect. I broke my 'no libraries' rule here as client-side routing isn't easy to get right. Barba does a decent job without unnecessary bells and whistles, is fairly small and I load it seperate from the main bundle with low priority so to not impact performance.

## Media { #media tabindex="-1" }

I'm a big proponent of using Image CDNs and find it makes the build process simpler and quicker, and makes further development easier. For more of my thoughts see my recent talk [Making Assets fly on the Jamstack with Image CDNs](/speaking/jamstack-imagecdns/).

I use [CloudImage](https://www.cloudimage.io) for this site as I like it's simplicity and the free tier is generous enough to cover my few images. The performance is good but I'd like to see a bit better here including AVIF support, [Imgix](https://imgix.com/) and [Cloudinary](https://cloudinary.com/) both perform slightly better but I'm happy with CloudImage for the moment.

I've written a custom Eleventy shortcode with a few parameters to generate `src` and `srcset` attributes to do what I need. This would make it easy to switch to a different provider if I wanted. To avoid the performance impact of using a different origin I [proxy CloudImage requests through Netlify using redirects](https://github.com/Accudio/alistair-shepherd/blob/92dbe295c402e4645ee463dc3e762fddfd673420/netlify.toml#L19).

## Fonts { #fonts tabindex="-1" }

The fonts used are [Red Hat Display](https://fonts.google.com/specimen/Red+Hat+Display) for titles and [Literata](https://fonts.google.com/specimen/Literata) for the body. Both are on Google Fonts and open source so I can download and manipulate them freely.

To improve performance I reduce their size by subsetting them to US ASCII characters using [Glyphhanger](https://github.com/zachleat/glyphhanger), and host them myself. This is ace for performance. Thanks to [Andy Bell](https://twitter.com/hankchizljaw) for the font combo!

<hr class="flow-space-major gap-bot-major">

## More posts about this site { #more tabindex="-1" }

- [Making a Parallax SVG Landscape - new site part 1](/writing/parallax-svg-landscape-1/)
- [SVG Landscape with live colour theming - new site part 2](/writing/parallax-svg-landscape-2/)

More to come if I get around to them!
