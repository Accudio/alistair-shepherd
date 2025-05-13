---
title: 'Device notifications via HTTP with ntfy'
date: '2025-05-13'
excerpt: "ntfy is a super handy service that makes it easy to send notifications to a device via HTTP requests"
metaDesc: "ntfy is a super handy service that makes it easy to send notifications to a device via HTTP requests"
---

I really like [ntfy](https://ntfy.sh) — a service that allows you to easily send notifications to your phone with just a HTTP request. It's a handy little tool to be able to do mobile notifications to yourself really easily with web standards.

I'm fairly technical, and make a lot of my own little things. Small apps that do what I want, integrations and such. Because I work with web, they're all little web apps. Sometimes what I need is a way to send a notification to my phone. I don't need a PWA or native app or anything like that, just a notification with some custom content, and I can tap it to go to a website.

ntfy is just that. On my phone I install the app and subscribe to a 'topic' (which is basically just a named event stream). Then I can send notifications to my device simply by making a web request to the ntfy service with that topic name. The topic could be secret — like a long secret key that no one else knows — for private notifications, or it could be public — a notification channel that anyone can subscribe to!

## Sending a notification with NTFY

For the purposes of this blog, let's call my topic "alistair-blog-demo". I can send a notification to folk who are subscribed to that topic with just:

```js
await fetch('https://ntfy.sh/alistair-blog-demo', {
    method: 'POST',
    body: 'Hello! This is a test notification'
})

```
And get the following notification a few seconds later!

<img class="measure-long" src="{% src 'ntfy-1.png', 820 %}" srcset="{% srcset 'ntfy-1.png' %}" sizes="{% sizes [ '(min-width: 52rem) 800px', 'calc(100vw - 2.66rem)' ] %}" alt="Screenshot of android notification menu with a notification from ntfy. It has a title of ntfy.sh/alistair-blog-demo, and body of 'Hello! This is a test notification'" width="1080" height="1079" loading="lazy">

You can get fancier with it with more parameters, all are [documented super well](https://docs.ntfy.sh/publish/) including which platforms support what parameters.

```js
await fetch('https://ntfy.sh', {
  method: 'POST',
  body: JSON.stringify({
    "topic": "alistair-blog-demo",
    "message": "Alistair has posted a new blog post: Device notifications via HTTP with ntfy",
    "title": "New blog post from Alistair",
    "tags": ["rocket"],
    "click": "https://alistairshepherd.uk/writing/ntfy/"
  })
})

```

<img class="measure-long" src="{% src 'ntfy-2.png', 820 %}" srcset="{% srcset 'ntfy-2.png' %}" sizes="{% sizes [ '(min-width: 52rem) 800px', 'calc(100vw - 2.66rem)' ] %}" alt="Screenshot of android notification menu with a notification from ntfy. It has the content from the previous code segment" width="1080" height="1132" loading="lazy">

## BeReal NTFY

I've built a handful of private little apps that notify me using ntfy, one public topic I've set up is ntfy notifications for the app BeReal, on [BeReal ntfy](https://bereal-ntfy.netlify.app) (I know, imaginative).

BeReal is an app that gets everyone to take a photo of themselves and what they're doing once at the same time every day (timezone dependent). You can then see what your friends are up to at that time!

For an app that has like three functions — notification, photo, view — it does the notification bit miraculously badly. It's pretty inconsistent, and when I have it on a separate GrapheneOS profile, I wanted to build my own notification system.

ntyf made that easy and it look like 30 lines of code — receive a webhook when it's BeReal time, send a POST request with ntfy.

## Limitations and thoughts

ntfy is pretty basic, despite how handy it is! It's definitely the type of tool for a little cheap fun tool, rather than a proper app but honestly that's exactly what I want. It gives me more agency with my devices and more I can do without needing to learn new technology I don't need to or spend a lot of time on it.

The main thing to keep in mind is that ntfy topics are public. I can send notifications to that URL but so can anyone else! My secret topic for private is all very well until someone finds it and can subscribe to my stuff without me knowing. You can pay to reserve a topic to prevent people posting but it would be visible to anyone so don't use it for anything super secret. My "server under increased load" notification isn't a big deal if someone else sees it.

Anyway, wanted to share a handy little tool that others may find useful!
