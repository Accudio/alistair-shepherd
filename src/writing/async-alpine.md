---
title: Async Alpine — Asynchronous Alpine component loading
date: '2022-05-30'
excerpt: "Async Alpine for loading Alpine.js components asynchronously and lazily"
metaDesc: "Async Alpine for loading Alpine.js components asynchronously and lazily"
tags:
- JavaScript
- Open Source
- Alpine.js
---

I've released a new side-project, a library called [Async Alpine](https://github.com/Accudio/async-alpine)! Async Alpine is a wrapper for the fantastic [Alpine.js](https://alpinejs.dev/) JavaScript library, giving you greater control of component loading and adding asynchronous/lazy loading to Alpine. This makes loading components when visible, for certain screen widths, on events and more, super simple!

If you want to dive straight in check out the [Async Alpine GitHub repo](https://github.com/Accudio/async-alpine) for the docs!

This is a companion post to ["Code Splitting in Alpine.js"](/writing/code-splitting-alpine), a post that goes into more depth on why we would want to split up our code more, and the principle on how we do it in Alpine. Check out that for more depth, stay here for how to get started with Async Alpine.

## Getting Started

There's a few different methods of installing, depending on how you load Alpine.

If you load Alpine via a CDN script, do the same with Async Alpine:
```html
<script src="https://unpkg.com/async-alpine/dist/async-alpine.script.js"></script>
<script src="https://unpkg.com/alpinejs/dist/cdn.min.js"></script>
```

For npm installations, install with `npm install async-alpine` and include it in your bundle:
```js
import Alpine from 'Alpine.js';
import AsyncAlpine from 'async-alpine'
AsyncAlpine(Alpine)
// any components or plugins go here
Alpine.start()
```

## Components

Async Alpine leans into and relies on ES Modules to dynamically import components. This supports all modern browsers and keeps the package fast and lightweight.

An ES Module Alpine component looks like this:
```js
export default function myComponent() {
  return {
    message: 'hello!',

    init() {
      alert(this.message)
    }
  }
}
```

It's common to write Alpine components like this already, so this might look familiar! The key thing is that the file uses `export default` ES Module syntax to export the component function.

If you ship handwritten JavaScript then you can write your component similar to above, pop it in your assets directory and you're golden!

If you process JS with a build tool or bundler you may need to do some work to output modules in the right format. This will depend on your build tool, but the majority are easy to set up:

- [WebPack &mdash; output library type 'module'`](https://webpack.js.org/configuration/output/#module-definition-systems)
- [Rollup &mdash; format 'es'](https://rollupjs.org/guide/en/#configuration-files)
- [ESBuild &mdash; format 'esm'](https://esbuild.github.io/api/#format-esm)
- [Parcel &mdash: outputFormat 'esmodule'](https://parceljs.org/features/targets/#outputformat)

## Importing Components

You write your Alpine components as normal with Async Alpine, and add a couple of attributes to your component root:

```html
<div
	x-data="myComponent"
	ax-load
	ax-load-src="/assets/my-component.js"
></div>
```

The `ax-load` attribute declares that this is managed by Async Alpine and declares the strategy&mdash;we'll leave that as the default for now.

In `ax-load-src` you add the public URL of your component module. Here you can use relative URLs (`/assets/component.js`) or remote full URLs including the domain name (`https://example.com/component.js`).

Now your component is loaded asynchronously when it is present on the page! No need to load it everywhere in your bundle, it'll only load if it's needed.

## Loading Strategies

We left `ax-load` as the default previously, but we can be more specific than that! By default Async Alpine will load components 'eagerly', that means if the component is used on the page it will be downloaded as soon as it's found.

That's perfect for high-priority components at the top of the page, but for less important components we can use other rules to load them when they're needed. This component will load when it comes into view using the 'visible' strategy:

```html
<div
	x-data="myComponent"
	ax-load="visible"
	ax-load-src="/assets/my-component.js"
></div>
```

At the time of writing, Async Alpine has six different strategies:

- `eager`&mdash;load the component as soon as it's found;
- `idle`&mdash;waits until the browser isn't busy;
- `visible`&mdash;load the component when the user scrolls close to it;
- `media`&mdash;in response to any browser media query!
- `event`&mdash;use a DOM event to trigger loading at your command;
- `parent`&mdash;for loading nested components smarter.

These can be used as you'd like, and even combined for really advanced loading strategies!

A carousel at the bottom of a page that only displays on small screens? `ax-load="visible | media (max-width: 768px)"` has you sorted!

An 3D model viewer that runs on a button press but needs to ensure it's parent is loaded first? `ax-load="event | parent"` will do the trick.

## Project Status

Async Alpine is still in development and the API isn't totally stable quite yet. That said, I use it successfully on production sites and would encourage you to give it a try!

There's more information, installation instructions, examples, and advanced settings in the [documentation on GitHub](https://github.com/Accudio/async-alpine).

If you use it or have any questions I'd love to chat with you! I am very keen to see how it can help improve the websites you build, get feedback from people who have used it and make improvements in response!
