---
layout: work
title: Ping It To

metaDesc: Case study for Ping It To, a web app helping you share links between mobile and desktop.

featured: 3

summary: Paired React PWAs helping you share URLs between mobile and desktop.

intro: '
  <h1>Ping It To</h1>
  <p>
    A tool that uses WebRTC to share links between desktop and mobile uising QR Codes. No account required, no ridiculous tracking.
  </p>
  <p>
    Consists of two Progressive Web Apps (PWAs) powered by Next.js and Preact, using PeerJS for peer-to-peer connections between mobile and desktop versions.
  </p>
'
techs:
  - Next.js
  - React / Preact
  - PWA
  - WebRTC
  - Custom SCSS
  - Netlify
buttons:
  - title: Visit Website
    label: pingit.to
    url: https://pingit.to

thumbnail: pingitto-thumb.jpg

mainImage:
  src: pingitto.jpg
  alt: Screenshot of Ping It To website on desktop, and on mobile
---

## The Project

I have used QR-based URL sharing solutions for a couple of years and none have been quite what I wanted from them.

Between them they suffered from reliability problems, lack of SSL security, slow load times, poor apps and also required a fair chunk of userscripts and userstyles to look good enough to be my start page.

I also didn't want to use a service that provides the same functionality with accounts, tracking you and your links.

## The Build

I built this project in my free time primarily to have a solution to share URLs that filled all my requirements, but it was also a good opportunity to refresh my knowledge in technologies I hadn't used in a while.

I originally started building it in Svelte, as I love writing Svelte and particularly like the lack of runtime. However, I found that when it came to generating and reading QR codes I would have to write my own library. I started doing so before realising it wouldn't end up being as good as I wanted, and why re-invent the wheel?

I switched the project to React due to its huge ecosystem of libraries and utilities. I chose to use Next.js so features like routing, styling, project structure and static compilation were included with no effort. I also switched from using React to Preact, massively reducing the bundle size with no impact on the s code I write or the performance of the app.

The communication between mobile and desktop was fairly straightforward thanks to PeerJS. There is a free-to-use public server, but to ensure maximum reliability I set up my own server. Thanks to it's free tier, I hosted this on Google Cloud Compute with a basic express server and nginx reverse proxy.

The final key component was to write service workers for both the mobile and desktop client, making sure assets were offline and handling the share dialog on mobile.

## The Result

I am really happy with Ping It To, and is by far my most used tool. It's set as the start page on all my browsers, and I use it several times a day. I particularly like the service working precaching a background image from unsplash to display instantly on next load.

Although I've used React and Next.js several times a few years ago, Next has gotten to a place where it's so nice to work in. It adds so many common-sense additions to React, and especially when combined with Preact makes for a great developer experience, all of the benefits of React whilst also performing great.
