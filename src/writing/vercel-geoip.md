---
title: Simple, cheap GeoIP API using Vercel Edge functions
date: '2023-04-30'
excerpt: "How you can use Vercel to set up your own GeoIP API service with no rate limits, payment plans or tracking!"
metaDesc: "How you can use Vercel to set up your own GeoIP API service with no rate limits, payment plans or tracking!"
tags:
- JavaScript
- Browsers
---

Need to look up a users' approximate location based on their IP address? Don't want to opt for a third-party GeoIP service or integrate it into your backend?

Turns out that [Vercel](https://vercel.com) makes it super easy to set up a simple GeoIP service for yourself!

If you just want the code you can find the repo at [github.com/Accudio/vercel-geoip](https://github.com/Accudio/vercel-geoip) and demo at [accudio-geoip.vercel.app](https://accudio-geoip.vercel.app/). You can fork that repository and deploy it to your own Vercel account to use yourself!

Read on for a deeper explanation, and let me know if you have any thoughts or issues! You can do [a similar GeoIP API with Netlify](https://edge-functions-examples.netlify.app/example/geolocation), maybe I'll make another post for that in future!

## Background

For a couple projects I'm currently working on, recently I had need for a Geolocation API. Nothing too major, just getting a users very rough location based on their IP address, to tailor their default experience of language, currency, or laws.

There are a TON of Geolocation API services with various pricing, trustworthiness and privacy/tracking policies. I looked at a few, but the per-lookup pricing and lack of certainty around trusting a third-party with our users' IP addresses was a bit of a deterrent.

## Vercel and Geolocation Headers

If you haven't heard of Vercel before, it's a hosting company that specialises in JAMStack sites, similar to Netlify. It's a good platform for static sites, JavaScript-based frameworks and serverless/edge functions.

It's the serverless and edge functions that are the key to this setup. Serverless and edge functions allow us to run a node.js script on each request, responding dynamically. Serverless functions run on centralised servers (they're pretty badly named!), Edge functions are a bit more restrictive and run directly on the CDN nodes allowing for a potentially faster or lighter response.

These functions can be combined with [Vercel's HTTP headers with geolocation information](https://vercel.com/docs/concepts/edge-network/headers#x-vercel-ip-country_). We can send that data back on the request in a JSON format, and then use that within our front-end JavaScript.

## The code

As most of the examples of Vercel's functions rely on Next.js, it's a bit tricky to find how to set up functions without it. For my own later reference and to avoid you having to go through the same research, I'm going through the full process!

### 1. Initialising

First we need to initialise our repo, npm project and install the Vercel packages.

```sh
mkdir vercel-geoip && cd vercel-geoip
git init
npm init -y
npm i -D vercel
npm i @vercel/edge
```

### 2. Trying out an edge function

In Vercel projects functions are placed within an `api/` directory, so let's create an `api/index.js` file. This would run on any requests to `/api/`. Within it, we're going to put the very basics of a edge function that has a basic text response:

```js
// api/index.js
export const config = {
  // Specify this function as an edge function rather than a serverless function
	runtime: "edge"
};

// We export the function that runs on each request, which receives the `request`
// parameter with data about the current request. We'll use this later
export default function (request) {
  // respond to the request with the context "hello world!"
  return new Response('hello world!')
}
```

To test our function, we can run `npx vercel dev` to run the Vercel development server. This will ask you to link the project to your Vercel account and some details about the project. You can leave those details as default.

Now, if you visit the dev URL in your browser and add `/api` — probably [`localhost:5000/api`](https://localhost:5000/api) you should see "hello world!".

### 3. The Geolocation bit

Now let's amend our `index.js` file to include the Geolocation bits:

```js
// api/index.js
// Import the geolocation and ipAddress helpers
import { geolocation, ipAddress } from "@vercel/edge";

export const config = {
	runtime: "edge",
};

export default function (request) {
  // The geolocation helper pulls out the geoIP headers from the
	const geo = geolocation(request) || {};
  // The IP helper does the same function for the user's IP address
  const ip = ipAddress(request) || null

  // Output the Geolocation data and IP address as a JSON object, and
  // set the content type to make it easier to handle when requested
	return new Response(
		JSON.stringify({
			...geo,
			ip,
		}),
		{
			headers: { "content-type": "application/json" },
		}
	);
}
```

Now this won't work in the dev server as Vercel doesn't inject the geolocation headers there, but if you open the function at least it shouldn't error. You can get a preview deployment to test it on the Vercel servers by running `npx vercel`.

If you visit the `/api` route on your preview URL you'll get the Geolocation data of your IP address! Neat!

### 4. Cross Origin Resource Sharing

If we try to call this on a different website with JavaScript, we're going to run into CORS issues. CORS — Cross Origin Resource Sharing — is a way browsers prevent websites from using a browser to access content they shouldn't have access to, like resources from a local network. This means as things currently stands, a browser won't let us access the content from our API request with `fetch`.

To allow us to use the API within JavaScript in a browser, we need to tell the browser to allow CORS. We can do this by adding some HTTP Headers, via a `vercel.json` config file in root of our project:

```json
// vercel.json
{
  "headers": [
    {
      "source": "(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Credentials", "value": "true" },
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
        { "key": "Access-Control-Allow-Headers", "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" }
      ]
    }
  ]
}
```

This is taken from Vercel's ["How can I enable CORS on Vercel?" guide](https://vercel.com/guides/how-to-enable-cors). We don't really need all of these parameters for our simple API, but for the sake of keeping it easy there's no real harm in keeping them.

There is one thing to note with the above code however, the `Access-Control-Allow-Origin` header allows all origins to make a request to the API. In most cases that might be okay, but you may want to prevent other sites from using your API, especially if you start hitting Vercel's usage limits.

You can [whitelist a single origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#access-control-allow-origin) by adding it to the `Access-Control-Allow-Origin` header instead of `*`. You could also include the CORS headers within the edge function depending on the requesting Origin for multiple origins. I haven't run into that problem yet though, so consider that a further exercise for the reader!

### 5. Root rewrite (optional)

The final touch is a rewrite so we can hit our API at the root URL `/`, instead of having to include `api/` on every request. With Vercel we can do that with a few more lines to `vercel.json`:

```json
// vercel.json
{
  "headers": [],
  "rewrites": [
    { "source": "/", "destination": "/api/" }
  ]
}
```

### 6. Deploy and test!

We can deploy the API to Vercel with `npx vercel --prod`, or link the project via the Vercel website to a Git repo on GitHub, GitLab or similar. Access the API at the Vercel URL, for example [`accudio-geoip.vercel.app`](https://accudio-geoip.vercel.app) and there we go!

This is the result I get when visiting that URL (IP obfuscated for privacy):

```json
{
  "city":"Loughborough",
  "country":"GB",
  "countryRegion":"ENG",
  "region":"lhr1",
  "latitude":"52.7681",
  "longitude":"-1.2026",
  "ip":"XX.XX.XX.X"
}
```

It's definitely not perfect, to start I'm in Edinburgh not Loughborough! City and Country Region should maybe be taken with a pinch of salt, but that's something I run into with GeoIP systems all over the web so it's clearly not just Vercel.

For the purposes of country though it's reasonably accurate, and the City and Region may be helpful to set a default that a user can later change.

### 7. Using the API within JavaScript

We can use this within JavaScript on another website like so, but keep in mind you may need to switch from using `await` to `.then()` depending on your setup.

```js
const geoRequest = await fetch('https://accudio-geoip.vercel.app')
const geo = await geoRequest.json()

console.log(geo.country)
// GB
```
