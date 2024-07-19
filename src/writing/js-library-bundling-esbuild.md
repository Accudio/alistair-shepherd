---
title: JS library compilation to browser, esm and cjs using esbuild
date: '2024-07-19'
excerpt: "My setup using esbuild to compile a Javascript library for browser use, ES Module import and CommonJS require"
metaDesc: "My setup using esbuild to compile a Javascript library for browser use, ES Module import and CommonJS require"
---

This is a quick post, public but mostly for myself about how to do simple JS library compilation and bundling with [esbuild](https://esbuild.github.io).

I have a few JS libraries that are shipped via npm, and can be used with an ESM `import`, CommonJS `require`, or a browser `script` element. I've found it pretty tricky in the past working out how to compile to all of these correctly from my ESM source, and the internet hasn't been very helpful either.

What I want is a setup that will produce all three of those with no huge legwork, handle bundling, sourcemaps, minification for me, convert modern syntax to es6, and have a dev mode that will re-compile on source change.

Esbuild is ideal for this circumstance as it has a simple API, all of those features and is extremely fast! I'm not saying this is the ideal setup but it works pretty well for me.

## build.js

This is the build script, called with `node build.js` for a production build and `node build.js --watch` for dev mode. Pop these in your `package.json` scripts if you like.

You define the formats you want and the esbuild options within `buildAll`, I find this works well in most instances. This will get `src/index.js` and `src/script.js` (for browsers, imports index and runs it) and output to the `dist/` directory.

```js
import esbuild from 'esbuild'

buildAll()

async function buildAll() {
	return Promise.all([
		build('script', {
			entryPoints: ['src/script.js'],
			platform: 'browser',
			minify: true,
			target: ['es6'],
		}),
		build('esm', {
			entryPoints: ['src/index.js'],
			platform: 'neutral'
		}),
		build('cjs', {
			entryPoints: ['src/index.js'],
			target: ['node10.4'],
			platform: 'node',
		}),
	])
}

async function build(name, options) {
	const path = `${name}.js`
	console.log(`Building ${name}`)

	if (process.argv.includes('--watch')) {
		let ctx = await esbuild.context({
			outfile: `./dist/${path}`,
			bundle: true,
			logLevel: 'info',
			sourcemap: true,
			...options,
      minify: false
		})
		await ctx.watch()
	}
	else {
		return esbuild.build({
			outfile: `./dist/${path}`,
			bundle: true,
			...options,
		})
	}
}

```

## package.json

To deploy this via npm and potentially load the browser version from a CDN like JSDelivr, we need to set up our `package.json` correctly. The following snippet is what I've found works well for modern versions of node. `exports` defines which version of the file to use based on how it's imported, Node will change which version is used based on whether we `require` or `import`. We set `main` to the `script.js` file so it's picked up by all major CDNs I've tried.

```json
{
  "main": "./dist/script.js",
	"exports": {
		"require": "./dist/cjs.js",
		"import": "./dist/esm.js",
		"default": "./dist/esm.js"
	},
}
```
