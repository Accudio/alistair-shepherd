---
title: Proxying an Image CDN with Cloudflare workers
date: '2024-08-03'
excerpt: "Using free Cloudflare workers to proxy an image CDN on the main origin for performance"
metaDesc: "Using free Cloudflare workers to proxy an image CDN on the main origin for performance"
tags:
- JavaScript
- Images
- Performance
---

A short intro and code on how you can use Cloudflare workers on Cloudflare's free tier to proxy an image CDN like Cloudinary, CloudImage or Imgix. Using this you can load optimised images via the primary origin, support the Vary header for format conversion, and use Cloudflare's cache for those images.

## Why

CDNs are extremely good for web performance, and if you can deliver your HTML via a CDN you can benefit from extremely fast from-cache load times and rely on a smaller server.

Cloudflare is not without it's problems, but it offers a free tier that gives you extremely good CDN capabilities for zero cost. In my opinion there are better options for bigger usecases, but for a small site the free Cloudflare tier is great.

One thing notaby absent from Cloudflare's free tier is image transformation. I find that super frustrating because loads of companies offer a free tier of image transformation but not Cloudflare, so if you want to keep costs down you're going to have to use a different company. If you're not familiar with Image CDNs and why you should use one, check out my [talk on the subject](/speaking/imagecdns/).

With an Image CDN you will probably get a URL something like kdnfwe948owqq.example.com that you can load your images through. Now you're loading your images through a different origin however, there is a performance implication where a new connection has to be established to that origin which may delay image loads.

Wouldn't it be great if we could use our image CDN, but make it use our primary origin that matches our website? It's a little tricky but turns out that's possible to do in the free tier of Cloudflare using Cloudflare workers!

## How

This code is mostly taken from [Wes Bos](https://github.com/wesbos/cloudflare-cloudinary-proxy) and [Wilson Hou](https://github.com/wilsonhou/cloudflare-image-proxy) on GitHub, thanks to them for their work.

First thing is to set up a Worker. You can do this via a command-line but to be honest for this I just use the admin.

1. Go to your Cloudflare Dashboard and "Workers & Pages"
2. "Create", "Create Worker", name it, and then "Deploy"
3. Now lets' assign and test it
4. Assign it to a URL by going to your cloudflare zone/website and to "Workers Routes"
5. "Add Route", choose the worker you've just created and create a route pattern
   - This needs to include the domain name and uses regex to specify patterns
   - www.example.com/images/* will make the worker serve all requests under the `/images/` path
6. "Save" and confirm requests to `/images/whatever` return "Hello world!"

Now we need to add the proxying code. To add this we go back to the worker we created and click "Edit code". This opens an online editor with text field, debugging tools and the "Deploy" button in the top-right.

Add the below code, customise the `destination` variable and add any path manipulation you need. Then deploy and you should be golden!

```js
const destination = 'https://kdnfwe948owqq.example.com'

async function serveAsset(request, event, context) {
  const url = new URL(request.url)

  // if this is already in the cache return that
  const cache = caches.default
  let response = await cache.match(request)
  if (response) return response

  let path = url.pathname
  // make any path manipulation here, eg removing a prefix
  // path = path.replace('/images', '')

  // request the URL with path and URL params
  // include request headers for content negotiation/auto-format
  response = await fetch(
    `${destination}${path}${url.search}`,
    { headers: request.headers }
  )

  const headers = new Headers(response.headers)
  // add caching header, configured here for 1-year
  headers.set("cache-control", `public, max-age=31536000`)
  // vary header so cache respects content-negotiation/auto-format
  headers.set("vary", "Accept")

  // create response and add to the cache if successful
  response = new Response(response.body, { ...response, headers })
  context.waitUntil(cache.put(request, response.clone()))

  return response
}

export default {
  async fetch(request, event, context) {
    // get the response
    let response = await serveAsset(request, event, context)
    // if not a successful status code return response text
    if (!response || response.status > 399) {
      response = new Response(response.statusText, { status: response.status })
    }
    return response
  },
};
```

## Things to note

This works pretty well, there are a couple of things to note however.

The free Cloudflare tier includes [limits on Workers](https://developers.cloudflare.com/workers/platform/limits/#worker-limits), so depending on the size of your site you may run into these. It's also account-level not website-level so keep that in mind. At time of writing it's pretty high at "100,000 requests/day, 1000 requests/min". You'll likely run into that only if you have a busy site or many using this technique.

This also creates another layer of caching in your image chain, which depending on your setup and if your images are mutable could be tricky. This would probably already be the case for the image CDN however, so you'd be needing to clear two caches instead of one. Using permanent image URLs and ensuring modifications create a copy instead of modifying the original is a great way to avoid this being an issue and better for client caching also.
