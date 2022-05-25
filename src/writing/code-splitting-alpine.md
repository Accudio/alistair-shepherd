---
title: Code Splitting in Alpine.js
date: '2022-05-25'
draft: true
excerpt: "Using Alpine.js with Asynchronous, lazy loaded components and code splitting"
metaDesc: "Using Alpine.js with Asynchronous, lazy loaded components and code splitting"
tags:
- JavaScript
- Open Source
- Alpine.js
---

I've recently published a library called Async Alpine that adds asynchronous or lazy loading of components to Alpine.js! It can help you write faster, more efficient sites using Alpine.js. Check out my [Async Alpine blog post](#0) for more info!

## How I use Alpine.js

At [Series Eight](https://serieseight.com) we love the JavaScript framework [Alpine.js](https://alpinejs.dev). Alpine is a lightweight JS library that allows you to add interactivity and JS to static HTML with attributes using vanilla browser DOM. It makes it easy to add JavaScript to your existing HTML rather than replacing it like more traditional JS, but puts click events and text insertion right where it happens in the markup like more modern.

This post isn't meant as an introduction to Alpine, for that check out [Alpine.js: The JavaScript Framework That’s Used Like jQuery, Written Like Vue, and Inspired by TailwindCSS](https://css-tricks.com/alpine-js-the-javascript-framework-thats-used-like-jquery-written-like-vue-and-inspired-by-tailwindcss/) on [CSS Tricks](https://css-tricks.com/).

There are two main ways of writing components in Alpine. For simple components you can write a JavaScript object as a string in the `x-data` attribute of your component. This is great if there's not a huge amount going on, but you can't import other libraries or transpile modern syntax, and it lacks the syntax and formatting help that writing in `.js` files provides.
For these more complex components, you can write them as a JS function and declare them with `Alpine.data()`.

I tend to write basic components inline but use JS components for anything with more than a couple variables/methods.

## Code loading in JavaScript

Moving away from Alpine for a moment, one area that the entire JS and web industry has been grappling and struggling with is code splitting. When you use libraries or frameworks, the easiest implementation is often bundling everything into a single JavaScript file that has the framework and all your components.

This is simple to build, but in terms of performance can be inefficient and makes little sense. Components appear in different places throughout the site and a user is unlikely to encounter them all. For example, in a typical eCommerce store you might have a static landing page. On the same site the product pages load a 3D model library to show off the products. In a bundling pattern, even though the landing page is static he user has to download all JavaScript required for the entire site&mdash;including the 3D library for the product page&mdash;even if it isn't needed. This will delay how quickly the page will become interactive on the first load, for a page and features that the user doesn't need yetmdash;and might never need if they don't visit that part of the site.

An alternative to bundling might be to split your application up into several chunks, pages or components. Tools like [Next.js](https://nextjs.org) will do this for you automatically to mitigate the cost of JavaScript in large sites, but the developer doesn't get much control over this.

Recent tools like [Astro](https://astro.build) and [Slinkity](https://slinkity.dev) take this a step further, allowing the developer to specify when a component should load. In many cases few users will ever scroll down to see a component at the bottom of a long page. We may want to load a component like that only when a user scrolls down far enough to be likely to view it.

Custom implementations have existed for a while, but these tools are the first I've seen to bring it to modern component-based JS libraries.

## Alpine component loading

Back to Alpine, when they declare components with `Alpine.data()` people often bundle them into a single JS file. Alpine needs to register components before it runs, meaning the easiest solution is a single bundle and we definitely don't have the fine control like with Astro/Slinkity. This is back to our issue with loading code that might never be used.

I found that as I worked on Alpine sites the bundle got larger and larger, often with components that were rarely visited or used. One of my sites was 120kB extra for a fancy animation on the bottom of a landing page, that was seen by 0.2% of visitors. This is the easy path with JavaScript frameworks and Alpine, loading that component when it was needed would be tricky and might mean abandoning Alpine.

## Code Splitting in Alpine.js

One way we can handle loading components asynchronously in Alpine is by taking control of when Alpine runs components. When it starts Alpine scans through the entire DOM and finds elements with the `x-data` attribute and runs them. If we rename `x-data` to something else in our code, then Alpine won't see and run it.

We'd need to consider the other Alpine attributes like `x-show`, `:class` and `@click` and a handful of other Alpine functionalities.

Once we've renamed those attributes and Alpine has started, we can control when we add the components again. We load the component when we'd like to based on certain conditions, use `Alpine.data()` to prepare it and then rename the attributes back again. Alpine will pick up on the change, see the component and run it as normal.

With that we have a lightweight way to load components on-demand!

## Async Alpine

That's a minimal setup that does the basics, but we could go a lot further to add different loading strategies and to support the standard Alpine syntax. I've done that work and released it as a library called [Async Alpine](https://github.com/Accudio/async-alpine)!

I've written another post focusing on it more&mdash;[Async Alpine - Asynchronous Alpine component loading](#0)&mdash;and you can find [more info about Async Alpine on GitHub](https://github.com/Accudio/async-alpine)

It came out of wanting Astro/Slinkity style loading for Alpine components, and I've been working on it the past couple of months. With more control over component loading I could build faster, more efficient websites without changing the syntax of a library I was familiar with. It has advanced loading options including immediately, on idle, when visible, using a media query, DOM events or **any** combination of those.

It's still very much in development and will need more testing before I'd consider it stable, but I've used it on several production websites with great success. If you're familiar with Alpine I'd encourage you to give it a try and see how it works for you!
