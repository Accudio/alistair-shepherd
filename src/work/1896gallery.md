---
layout: work
title: 1896 Gallery

metaDesc: Case study for the build of the 1896 Gallery website, using eleventy, headless WordPress and Netlify.

featured: 1

summary: A website built with Eleventy to showcase artwork online.

intro: '
  <h1>1896 Gallery Website</h1>
  <p>
    The 1896 Gallery is a art gallery based in the Highlands of Scotland. I&apos;ve worked with the 1896 Gallery team over several years and this is the third iteration of the site.
  </p>
  <p>
    I built the site from scratch, writing almost all HTML, CSS and JS myself to minimise dependencies. The stack consists of WordPress as a headless CMS, Eleventy to generate HTML from the WP REST API, with Netlify handling hosting and forms.
  </p>
'
techs:
  - Eleventy
  - Headless WordPress with ACF
  - Custom SCSS
  - Netlify
buttons:
  - title: Visit Website
    label: 1896gallery.com
    url: https://1896gallery.com

thumbnail: 1896gallery-thumb.jpg

mainImage:
  src: 1896gallery1.jpg
  alt: Screenshot of 1896 Gallery website on desktop, and on mobile

images:
  - src: 1896gallery2.jpg
    alt: Artist listing on 1896 Gallery website. Has grid of items with artwork, title, price and enquiry button.
  - src: 1896gallery3.jpg
    alt: Photography page on 1896 Gallery website. Has framed photo with grid of photography thumbnails beneath.
  - src: 1896gallery4.jpg
    alt: Artwork enquiry on 1896 Gallery website. Small thumbnail of art and enquiry form.
---

## The Project

The 1896 Gallery team asked about adding artists, artworks and exhibitions online for people to view. We found the best course of action would be to redesign the site with this in mind.

I worked with web and UX designer Natassia Woodger to design the site. We hoped to not only exhibit the artwork, but also produce a great experience to visitors.

## The Build

The 1896 Gallery team wanted to be able to add or remove content themselves, so I chose WordPress with ACF as the CMS. This allowed us to get it live quickly, and it's popularity made it easy for editors to get used to.

The site had no need for a database so this was a great opportunity to use a static site generator (SSG). The first build was with Gridsome and Vue but with little interactivity, the Vue runtime was unnecessary. I switched the project to Eleventy, a SSG focused on HTML output. Using a component-based methodology made the switch easy.

As a greenfield project, performance and accessibility was vital right from the beginning. I wrote all CSS and most JS by hand to reduce the number of dependencies, using SCSS and a Gulp build chain. As an artwork site, images were important so it was an obvious choice to integrate with an image CDN for resizing and optimisation. I chose CloudImage due to it's easy implementation, competitive pricing and great support.

## The Result

The fact the project started from almost scratch, and the flexibility of the client made the process a bit smoother than most. Although the Gallery team had an idea of what they wanted, they trusted Natassia and I to design and build with our discretion.

There were still some difficulties as with all projects; it was a tricky design to build and the switch from Vue to Eleventy took work. I also needed a bit of experimentation to get used to new methods and to find the best solution.

The website has been successful in prompting more enquiries, and particularly during the Covid-19 pandemic has allowed the business to still operate and sell their works.
