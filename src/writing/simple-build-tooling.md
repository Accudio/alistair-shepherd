---
title: Simple, fast build tooling with live reload for a non-framework website
date: '2024-07-14'
excerpt: "A nice modern bundling set up that can be used with CMS sites like WordPress without a framework. Uses Parcel and livereload"
metaDesc: "A nice modern bundling set up that can be used with CMS sites like WordPress without a framework. Uses Parcel and livereload"
---

I found a nice build tooling setup that can be integrated into non-framework websites where some part isn't controlled by the build tool. WordPress, Craft, Kirby or other CMS' are a good example. My setup uses Parcel, livereload and only a few node scripts to work. Jump to the details or stick around for the context.

## Context

Yesterday I started a new project for a family member, a simple WordPress website built with a custom from-scratch theme. One of the first thing to sort out is build tooling to bundle my CSS and JavaScript.

Most build tools now seem to be geared around the 'in fashion' technologies like React, Vue etc. I come back to build tooling relatively often, wondering if the tech world has understood yet that making 'index.html' a requirement for your build tool to work makes it useless to a huge number of developers.

If you weren't aware, many build tools want to own your entire website build including HTML and all assets. That works great when your whole website runs through your build, but for dynamic sites that have their own asset loading systems — like WordPress and countless other CMS' — that just doesn't work. Whilst many build tools do offer an alternative it is often second-rate, complex or doesn't have the same functionality I expect from a modern development setup.

That leads me onto my day yesterday. I wanted to work out finally how I can get a good modern development setup on this WordPress site. My requirements:

- Bundles my Scss, JS, inlines small images, imports from npm with tree-shaking. Standard build stuff.
- Uses versioned/hashed asset names to make caching easier and gives me those names in a way I can use in PHP.
- Fast. I don't want to wait for builds.
- Instant hot switching of CSS without need for a reload.
- Automatic reloading of my browser when JS, HTML or PHP changes.

Turns out this was harder to achieve than I expected. Let's go through the candidates:

Laravel Mix is what I'm used to from work and is what a lot of the PHP community uses. Simple, declarative way of bundling assets based on Webpack. It does have Browsersync out-of-the-box for automatic reloading, but it need to proxy your site to do that and I've found it a bit inconsistent. When using Mix I generally manually reload as it's more reliable.

Webpack is awful and I hate it. The configuration system is terrible and indecipherable and in my opinion it is always the wrong decision for a build tool.

Vite is the hot new kid on the block. It's very much designed for frameworks or for if it's also handling your index.html. It is possible to make it work with WordPress etc, but I haven't seen a setup that looks great and their documentation is pretty poor if you opt for that route.

RollUp looks good and I'd like to try it, but I find it quite difficult to actually get what I want from it. I've played with it a few times and just couldn't find a setup that was as flexible as I wanted. That may just be me not understanding right but that I can't work out how to get a simple CSS/JS bundler set up with it is not a good sign.

A custom system with node scripts and importing packages? It would probably work but there is a lot to deal with that build tools have already been through. Inlining a 600byte SVG into my CSS file is something I want but don't want to have to build myself.

Parcel was what I ended up settling on. It's a little like Vite where it's built for the simple, no config, index.html setup, but I find it's a lot more versatile and easy to use in other circumstances, and it's docs are a lot better for non-standard usecases.

## The set up

### Step 0. Installation

If you're following along with implementing this yourself, you'll need:

```sh
npm install -D parcel livereload pug
```

For the commands below you'll be able to use them from npm scripts no problems, but if you're running on the command line yourself add `npx ` in front of each.

### Step 1. Asset bundling

Parcel handles compilation of most stuff pretty easily and out of the box using `link` and `script` tags, so I'm starting there:

```html
<!-- src/assets.html -->
<link href="./css/main.scss" rel="stylesheet" />
<script type="module" src="./js/main.js"></script>
```

You can then run the production build with `parcel build ./src/assets.html --public-url /dist/`. This will bundle and import my `main.scss` and `main.js` files, and output `dist/assets.html` that includes the HTML to those versioned assets, which looks like this:

```html
<link href="/dist/assets.50a966ac.css" rel="stylesheet">
<script src="/dist/assets.fd9c92df.js" defer=""></script>
```

I can then import that `/dist/assets.html` into the output of my page — for example using PHPs `file_get_contents`. We can also change the path used in the output URLs with the `--public-url` parameter. For my WordPress theme for example I use `--public-url /wp-content/themes/themename/dist`.

Now we have asset bundling with URL hashing that we can import into our templates. The build is also really fast. Nice!

### Step 2. Parcel reloading and dev server

Okay so we've got a build, but it's one-off and doesn't do anything about reloading. Next step is setting Parcel up to reload. Although most guides will push you down Parcel's serve mode to serve your assets here, the way to go is actually using watch mode, with this script:

```sh
parcel watch ./src/assets.html --public-url /dist/ --hmr-host localhost --hmr-port 1234
```

This will run a watcher that compiles the assets and html file whenever CSS or JS files change. It also runs an HMR (Hot Module Reloading) server on `localhost:1234` and injects some code into `main.js` that will check if any assets or the page needs reloaded.

As we're importing `assets.html` into our site, this will pick up the changes between build and dev mode with no extra. Run the dev parcel command, refresh the page and now we have hot CSS replacement and reloading on JS changes.

### Step 3. Livereload for HTML and PHP changes

Whilst Parcel is handling the reloads of CSS and JS nicely, it doesn't do any updates when the HTML or PHP changes. I spent a while going down a rabbit hole of trying to work out if I could piggyback on Parcel's HMR system but found no way of doing that so we're using livereload instead.

Run livereload with this command, which watches HTML and PHP files for changes and triggers a reload. I'm also excluding the dist directory as that would result in a double refresh when Parcel builds `assets.html`. You can add other extensions here like your templating language.

```sh
livereload -e 'html,php' -x dist/ -p 1235
```

You'll also need to add the below script to your page to communicate with livereload:

```html
<script src="http://localhost:1235/livereload.js?snipver=1"></script>
```

When we have both Parcel and livereload running we have a hot replacement of CSS and a page reload on JS, HTML and PHP changes! All very fast and works pretty well. One final thing...

### Step 4. Automatic addition of livereload script

One problem with what we have now is we need a way to include the livereload script when it's needed in development, but not in the live site. This seemed tricky at first, perhaps we change an environment variable or something we can pick up in the site code? Turns out there's an easier way!

We're likely going to want to run Parcel and Livereload together during development, and Parcel is already building the `assets.html` differently depending on dev/production. So we can use Parcel to inject the livereload script only in development.

Parcel can't use functional logic in HTML files, but it can use it in files that build to HTML, most notably Pug! Pug is a templating language that compiles to HTML and includes stuff like if statements etc. So we can rename `src/assets.html` to `src/assets.pug` and add to our asset markup:

```pug
<link href="./css/main.scss" rel="stylesheet" />
<script type="module" src="./js/main.js"></script>
if process.env.NODE_ENV !== 'production'
	<script src="http://localhost:1235/livereload.js?snipver=1"></script>
```

This will only include the livereload snippet if the `NODE_ENV` environment variable is not `production`, which means it won't be included in our production build when we run `parcel build ...`.

## Final thoughts and the complete code

I'm really happy with this dev setup! It ticks all of my boxes from earlier, it's relatively simple and flexible, and brings a really nice modern dev setup to sites like WordPress or other CMS builds.

There are definitely some limitations, beyond the standard ones you have with this kind of setup where you don't get HTML access. The main one I've found is that whilst CSS and JS in the `head` works great it's a bit faffy to have more structure. You can generate more `html` files with assets in so you could have `head.html`, `footer.html`, `about-page.html`, but that does get a little messy and verbose. Images would also require the same treatment.

However, I don't believe I've seen a good development setup with this kind of website that handles this better. A purely up-front build tool like Laravel Mix has the same problems, and none of the 'fancier' tools seem to have a better solution either.

So yeah, I think this is what I'll be using for my own sites going forward, certainly with CMS', I'll see how it compares against my other methods for 11ty sites in future!

```json
// package.json scripts (npm-run-all for run-p command)
{
  "scripts": {
    "dev": "run-p dev:*",
    "dev:parcel": "parcel watch ./src/assets.pug --public-url /dist/ --hmr-host localhost --hmr-port 1234",
    "dev:livereload": "livereload -e 'html,php' -p 1235",
    "build": "parcel build ./src/assets.pug --public-url /dist/"
  }
}
```

```pug
<!-- src/assets.pug -->
<link href="./css/main.scss" rel="stylesheet" />
<script type="module" src="./js/main.js"></script>
if process.env.NODE_ENV !== 'production'
	<script src="http://localhost:1235/livereload.js?snipver=1"></script>
```
