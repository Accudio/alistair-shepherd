---
title: Simple, cheap GeoIP API using Netlify Edge functions
date: '2023-05-01'
excerpt: "How you can use Netlify to set up your own GeoIP API service with no rate limits, payment plans or tracking!"
metaDesc: "How you can use Netlify to set up your own GeoIP API service with no rate limits, payment plans or tracking!"
tags:
- JavaScript
- Browsers
audio: '/writing/netlify-geoip.mp3'
---

Need to look up a users' approximate location based on their IP address? Don't want to opt for a third-party GeoIP service or integrate it into your backend?

Turns out that [Netlify](https://netlify.com) makes it super easy to set up a simple GeoIP service for yourself!

If you just want the code you can find the repo at [github.com/Accudio/netlify-geoip](https://github.com/Accudio/netlify-geoip) and demo at [accudio-geoip.netlify.app](https://accudio-geoip.netlify.app/). You can fork that repository and deploy it to your own Netlify account to use yourself!

I have also published a very similar post (almost identical to be honest, it's mostly copied) about how to do the [same with Vercel](/writing/vercel-geoip).

Read on for a deeper explanation, and let me know if you have any thoughts or issues!

## Background

For a couple projects I'm currently working on, recently I had need for a Geolocation API. Nothing too major, just getting a users very rough location based on their IP address, to tailor their default experience of language, currency, or laws.

There are a TON of Geolocation API services with various pricing, trustworthiness and privacy/tracking policies. I looked at a few, but the per-lookup pricing and lack of certainty around trusting a third-party with our users' IP addresses was a bit of a deterrent.

## Netlify and Geolocation

If you haven't heard of Netlify before, it's a hosting company that specialises in JAMStack sites. I use it for this website and a lot of my personal projects, and it's a great platform for static sites, JavaScript-based frameworks and serverless/edge functions.

It's the serverless and edge functions that are the key to this setup. Serverless and edge functions allow us to run a node.js script on each request, responding dynamically. Serverless functions run on centralised servers (they're pretty badly named!), Edge functions are a bit more restrictive and run directly on the CDN nodes allowing for a potentially faster or lighter response.

These functions can be combined with [Netlify's `context` object](https://docs.netlify.com/edge-functions/api/#netlify-specific-context-object) for geolocation information. We can send that data back on the request in a JSON format, and then use that within our front-end JavaScript.

## The code

For my own later reference and potentially yours, I'm going through the full process of setting up a simple Edge function on Netlify!

### 1. Initialising and installing Netlify CLI

First we need to initialise our repo, npm project and install the Netlify CLI for local development.

```sh
mkdir netlify-geoip && cd netlify-geoip
git init
npm init -y
npm install netlify-cli -g
```

### 2. Trying out an edge function

In Netlify projects edge functions are placed within the `netlify/edge-functions/` directory by default, so let's create an `netlify/edge-functions/geoip.js`. Within it, we're going to put the very basics of a edge function that has a text response, and specify Netlify should serve it as the root request `/`:

```js
// netlify/edge-functions/geoip.js
// Specify that this function should run on the path `/`
export const config = { path: '/' }

// We export the function that runs on each request
export default () => {
	// Respond to the request with the content "hello world!"
	new Response('hello world!')
}

```

To test our function, we can run `netlify dev` to run the Netlify development server. Now, if you visit the dev URL in your browser — [probably `localhost:8888`](http://localhost:8888) you should see "hello world!".

### 3. The Geolocation bit

Now let's amend our `geoip.js` file to include the Geolocation bits:

```js
// netlify/edge-functions/geoip.js
export const config = { path: '/' }

export default async (request, context) => {
	// The context parameters includes details about the current request,
	// including the geolocation information and client IP address
	return Response.json({
		...context.geo,
		ip: context.ip
	})
}
```

Once again we can test this with `netlify dev`, you may need to restart the development server to get the latest changes. If you visit the preview URL you'll get the Geolocation data and your IP address in a JSON format! Neat!

### 4. Cross Origin Resource Sharing

If we try to call this on a different website with JavaScript, we're going to run into CORS issues. CORS — Cross Origin Resource Sharing — is a way browsers prevent websites from using a browser to access content they shouldn't have access to, like resources from a local network. This means as things currently stands, a browser won't let us access the content from our API request with `fetch`.

To allow us to use the API within JavaScript in a browser, we need to tell the browser to allow CORS. We can do this by adding some HTTP Headers via the second argument of `Response.json`:

```js
export const config = { path: '/' }

export default async (request, context) => {
	return Response.json(
		{
			...context.geo,
			ip: context.ip
		},
		// Add a second parameter to `Response.json`
		// where we can provide our CORS headers
		{
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET,OPTIONS'
			}
		}
	);
};

```

You could be more specific with your CORS headers, but for a simple API like ours this will do fine. These two lines allow all origins to access the API, and only the GET and OPTIONS methods.

That is one thing to note however, the `Access-Control-Allow-Origin` header allows all origins to make a request to the API. In most cases that might be okay, but you may want to prevent other sites from using your API, especially if you start hitting Netlify's usage limits.

You can [whitelist a single origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#access-control-allow-origin) by adding it to the `Access-Control-Allow-Origin` header instead of `*`. For multiple origins you could also dynamically read the `Origin` header and use that to allow or disallow a request. I haven't run into that problem yet though, so consider that a further exercise for the reader!

### 5. Deploy and test!

We can deploy the API to Netlify with `netlify deploy --build --prod`, or link the project via the Netlify website to a Git repo on GitHub, GitLab or similar. Now access the API at your Netlify URL, [for example `accudio-geoip.netlify.app`](https://accudio-geoip.netlify.app) and there we go!

This is the result I get when visiting that URL (IP obfuscated for privacy):

```json
{
  "city": "Newbury",
  "country": { "code": "GB", "name": "United Kingdom" },
  "subdivision": { "code": "ENG", "name": "England" },
  "timezone": "Europe/London",
  "latitude": 51.3195,
  "longitude": -1.4146,
  "ip": "XX.XX.XX.X"
}
```

It's definitely not perfect, to start I'm in Edinburgh, Scotland not Newbury, England! City and Subdivision should maybe be taken with a pinch of salt, but that's something I run into with GeoIP systems all over the web so it's clearly not just Netlify. (interestingly, my [Vercel post](/writing/vercel-geoip) had similar but slightly different results)

For the purposes of country though it's accurate, and the City and Subdivision may be helpful to set a default that a user can later change.

### 6. Using the API within JavaScript

We can use this within JavaScript on another website like so, but keep in mind you may need to switch from using `await` to `.then()` depending on your setup.

```js
const geoRequest = await fetch('https://accudio-geoip.netlify.app')
const geo = await geoRequest.json()

console.log(geo.country.code)
// GB
```
