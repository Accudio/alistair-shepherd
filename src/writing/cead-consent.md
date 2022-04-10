---
title: Managing tracking consent with Cead Consent
date: '2022-04-10'
excerpt: "How to manage tracking scripts and consent easily using Cead Consent"
metaDesc: "How to manage tracking scripts and consent easily using Cead Consent"
tags:
- JavaScript
- Open Source
- Privacy
---

An issue many businesses and sites will have to deal with is cookie and tracking consent on their websites. The web however is plagued with a huge number of intrusive trackers, and terrible, frustrating and often illegal consent dialogs.

Many websites implement a notice that doesn't allow opt-out, some offer an option that does nothing, whilst others only offer an opt-out solution - conveniently after they've collected all of your data.

Cead (pronounced kee-yed) is a cookie and tracking consent manager that is simple, lightweight, easy to implement and free. It's designed to help you implement a simple Accept or Deny dialog that will actually enable or disable tracking.

Cead is primarily created in response an increase in unsolicited web surveillance, but also to assist with meeting the standards of regulation including the EU GDPR & ePrivacy and California's CCPA. As privacy legislation becomes more strict it's important that solutions offer compliant opt-in and opt-out controls which Cead offers at it's core.

## Table of Contents

1. [The problem](#the-problem)
1. [A possible fix?](#possible-fix)
1. [Cead Consent](#cead-consent)
	1. [Using Cead Consent to manage Google Tag Manager](#google-tag-manager)
1. [Conclusion](#conclusion)

## The problem { #the-problem tabindex="-1" }

Tracking on the web has long been a difficult topic. The interests of business owners, SEO teams, Ad vendors, site users and lawmakers become almost impossible to resolve and frequently ignore each other.

I'm of the opinion that a site should have no tracking. This site has no analytics or anything, because your browsing is your own business. Check out [Jeremy Keith's "Ain’t No Party Like a Third Party"](https://css-tricks.com/aint-no-party-like-a-third-party/) for his insight on third-party scripts.

I find however that is an impossible stance to maintain when building sites for other people. They are often used to tracking metrics to evaluate their success, generate leads or target their services.

I've worked in agencies where I've seen and worked on a lot of websites for a variety of clients. They vary in purpose, build, location, size and much more, but one thing almost all have in common is they handle tracking terribly.

This may be familiar to you, but if not let me demonstrate the situation. We build a site for a client and add Google Analytics to it - pretty standard. Google Analytics has an easy way to allow people to opt-out by setting a global variable so we integrate a wee popup that allows the user to opt out.

That works great until the client gets an SEO expert who wants to track conversions better. They ask you to add a couple more scripts and you dutifully do so, but these have no way to opt out so all you can do is add them.

Later on, they want to add more scripts so they either ask for a text box to add them arbitrarily, install plugins, or install a Tag Manager.

Before long, the site has 5 analytics scripts, 10 conversion trackers and a [screen recorder*](#screen-recorder). Few of these respect the user's privacy settings or have a way to opt out, and the website slows to a crawl.

Some developers will give up at the beginning of this process and instead of asking consent put a message saying "This site uses cookies and tracks you. Deal with it or fuck off".

<div class="rounded pad-400 bg-dark-m1">
  <a id="screen-recorder"></a> * Seriously, check out <a href="https://mouseflow.com" rel="noopener referrer">MouseFlow</a> screen recorder, it's actually scary. I worked for a client a couple years ago who had it installed and you could see a recording of every user's session. Combined with GeoIP giving you the town they lived in, the client could make a pretty accurate guess as to **exactly** who that user was: "Ah yes that's probably Brian. I tried to sell x to him last week but looks like I should try sell him y instead based on how he's used the website"
</div>

### Why this is an issue

There are two reasons why this is a problem. Ethical and legal.

Ethically, if this is your site you are stalking your users - standing 2 metres behind them as they peruse your store. The level of what is acceptable here can be debated, but tracking someones every move without their ability to consent to this is not justified. Place yourself in ['Brians' shoes from the example](#screen-recorder) above and it's hard to dispute.

This is also illegal in many jurisdictions. Consumer privacy laws like GDPR and ePrivacy in the EU, and CCPA and similar in American states requires some level of consent to web tracking. I'm not a lawyer so contact one for proper advice, but this gist is at minimum you **need** a way for users to be able to meaningfully opt out of tracking.

### The opt-out issue

The big problem with the requirement to offer an opt out is that this is **very** hard to do.

As I mentioned earlier, some scripts like Google Analytics offer a method to opt out. This still isn't ideal as you're loading a tracking script and then checking if you're allowed to run it, but it at least gives you some control.

However that is the only tracking script I have come across that allows a way to opt out. Pretty much all other scripts will happily run as soon as they load, without regard for consequences. Even if they did have methods to opt-out, it would be individual for each service and be a nightmare to manage.

Developers can deal with this by dynamically adding scripts under certain conditions, but clients will want to add their own and often have no consideration for the consequences.

As developers we're left in a difficult position. Laws require that tracking can be opt-out, but we have no way to do so.

## A possible fix? { #possible-fix tabindex="-1" }

The way to fix this is to be in control of all tracking scripts, and then load them ourselves in response to a consent status.

There are many solutions to do this as investors have monopolised on businesses grappling with the issue of tracking and consent.

Companies like OneTrust offer pricey 'hosted consent solutions' that supposedly solve all your problems. However when I load their site my browser tells me it's blocked 14 trackers.
If you've ever been annoyed by a cookie popup, it's probably a solution like this. A big annoying popup that makes opting out difficult and will send all your preferences to a tracking service to track your consent.

My opinion is that these companies are morally corrupt. Tracking the consent of users on a remote server is still tracking and they charge extortionate fees to fix a problem their own investors created.

I think the fix is a lot easier. Our webpage only runs tracking scripts when we say so. That's why I made Cead Consent.

## Cead Consent { #cead-consent tabindex="-1" }

Cead Consent is a small library designed to solve the issue of tracking consent by controlling when scripts can run on the client-side. By making a tiny modification to tracking scripts we can load them on-demand in response to consent status.

It is designed to be extremely simple, easy to use and lightweight, and I'll give you a quick demo of how you would use it to solve the problem of consent.

Check out [the GitHub repo](https://github.com/accudio/cead-consent) for full instructions on [installation](https://github.com/accudio/cead-consent#installation) and [usage](https://github.com/accudio/cead-consent#managing-tracking-scripts-and-images).

### Using Cead Consent to manage Google Tag Manager { #google-tag-manager-fix tabindex="-1" }

First we need to install Cead. It can either be loaded from a CDN or installed via `npm`, here I'll use the CDN to make it easier. We need to add a CSS file, a JavaScript file, and a little bit of HTML:

```html
<html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/cead-consent@1/dist/cead.css">
  </head>

  <body>
      <p>Hi! Could we please enable some services and cookies to improve your experience and our website?</p>
      <div class="cead__btns">
        <button class="cead__btn cead__btn--decline">No, thanks.</button>
        <button class="cead__btn cead__btn--accept">Okay!</button>
      </div>
    </div>

	<main><!-- your page content --></main>

    <script src="https://cdn.jsdelivr.net/npm/cead-consent@1/dist/browser.js"></script>
  </body>
</html>
```

Although Cead consent can be used with all sorts of tracking scripts or pixels, I feel it's at it's best when combined with a tag manager like Google Tag Manager.

We manage tracking scripts (and images) by modifying their code slightly so they'll only run when Cead allows them to. When used with a Tag Manager the client or SEO teams can add as many scripts as they'd like to Google Tag Manager and we need to modify only one script for Cead.

When you copy your script from Google Tag Manager, it will look something like this (with a different GTM_MEASUREMENT_ID):
```js
<script>
dataLayer=[];
(function(w,l){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'})})(window,'dataLayer');
</script>
<script async src="https://www.googletagmanager.com/gtm.js?id=GTM_MEASUREMENT_ID&l=dataLayer"></script>
```

See that last line, the `<script async src="...">`? All we need to do is change the `src` attribute to `data-src`, and add the `data-cead` attribute, like so:

```js
<script>
dataLayer=[];
(function(w,l){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'})})(window,'dataLayer');
</script>
<script async data-src="https://www.googletagmanager.com/gtm.js?id=GTM_MEASUREMENT_ID&l=dataLayer" data-cead></script>
```

And that's it! With the installation of Cead and that small change to the script tag we've made it so users can choose to consent to tracking or not and their choice is respected.

## Conclusion { #conclusion tabindex="-1" }

Although the best situation is to avoid adding tracking to sites where possible, it often isn't possible. The best situation then is to use a lightweight, simple consent manager that won't frustrate users, will respect their consent choices and is free and open-source.

Cead has more options including managing [inline scripts](https://github.com/accudio/cead-consent#inline-scripts), [tracking 'pixels'](https://github.com/accudio/cead-consent#image-pixels), an ['opt-out mode'](https://github.com/accudio/cead-consent#options), [cookie removal](https://github.com/accudio/cead-consent#managing-cookies) and more. Check out the documentation on the [GitHub repo](https://github.com/accudio/cead-consent) to see all it can do!
