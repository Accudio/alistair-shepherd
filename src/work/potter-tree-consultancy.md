---
layout: work
title: Potter Tree Consultancy

featured: 1

summary: Brochure site for Arboriculturist with Gridsome, Vue and headless WordPress.

intro: '
  <h1>Potter Tree Consultancy</h1>
  <p>
    Andrew Potter is a chartered Arboriculturalist based in Aviemore but working across Scotland. Previously he had gotten work through word-of-mouth and associations, however he wanted to have an online presence so people could more easily see his work and services, and to get in touch.
  </p>
  <p>
    The HTML and CSS was build from scratch using Gridsome and Vue, making the little dynamic functionality extremely quick and easy to implement. This was my first client project using WordPress as a headless CMS and it has proving to be a resounding success. The frontend uses Gridsome&mdash;a Vue static site generator&mdash;consuming the WP REST API and generating a statis website to host with Netlify.
  </p>
'
techs:
  - Vue
  - Gridsome
  - GraphQL
  - Headless WordPress with ACF
  - Custom SCSS
  - Netlify
buttons:
  - title: Visit Website
    label: pottertreeconsultancy.com
    url: https://pottertreeconsultancy.com

thumbnail: pottertreeconsultancy-thumb.jpg

mainImage:
  src: pottertreeconsultancy1.jpg
  alt: Screenshot of Potter Tree Consultancy website on desktop, and on mobile

images:
  - src: pottertreeconsultancy2.jpg
    alt: Services page on Potter Tree Consultancy website. Has header with contact button, buttons and grid of services.
  - src: pottertreeconsultancy3.jpg
    alt: Project page on Potter Tree Consultancy website. Has title, project details, image and body text.
  - src: pottertreeconsultancy4.jpg
    alt: About page on Potter Tree Consultancy website. Photo of man, contact buttons and body of text..
---

## The Project

Andrew Potter approached me through one of my previous clients, looking to establish an online presence for his Arboricultural business "Potter Tree Consultancy". Previously all of his new customers came through word-of-mouth and through associations he was member of.

The primary goal of the website was to demonstrate his work and detail his services to those who already knew of the company, and do so more accessibly than his previous processes.

I worked with web and UX designer Natassia Woodger to design the site. Following Natassia's advice, we went for an extremely bold design to stand out within an industry of fairly bland design.

## The Build

It was important to Andrew that he was able to edit the website himself. He didn't anticipate doing so often, but wanted a website that he could run himself, updating content when needed and not having to have an ongoing developer contract.

This made the combination of a protected WordPress (with ACF) installation for content management, and a statically-generated site distributed on a CDN perfect for security and performance reasons. The disadvantage of this method was a build time after content updates—but Andrew accepted this compromise as he didn't intend to update content often. The choice of WordPress also had the upsides of being extremely quick to build and the extnesive documentation available for him to edit.

Gridsome was fairly new at the inception of this project, but I had experimented with it a little and really liked the way it combined the Gatsby-style GraphQL content population with Vue's seperation of concerns. Features like Gridsome's client-side routing, in-built image processing and Vue's large plugin ecosystem convinced me it would be a good stack for this project and allow me to develop extremely quickly.

## The Result

I really enjoyed developing this project, partly due to the great development experience of headless WordPress, Gridsome, and Vue. It was mostly however due to the stunning design produced by Natassia, and how it made for some interesting challenges in implementation.

The high contrast, mixture of full-width and contained elements, and brilliant "tree dividers" make for one of the most visually striking websites I have produced.

As I was working with a technology fairly new to me—Gridsome—there were obviously some challenges in development as I learned how best to use it. As a fairly young project also, I needed to develop a few Gridsome plugins myself to implement the functionality, and I thank the great community for help with that. Although I won't yet be using Gridsome on one of my bigger projects I am excited for it's continued development and maturing.

The website has been very successful in providing information to potential customers. It has generated major enquiries for the business from new customers, and also been very useful to Andrew in supporting his traditional methods of gaining new customers.
