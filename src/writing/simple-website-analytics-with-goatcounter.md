---
title: Simple website analytics with Goatcounter
date: '2026-03-24'
excerpt: "Using Goatcounter as a simple web analytics tool that is good for privacy, low in cost, lightweight, and simple. This is how I got on with it!"
metaDesc: "Using Goatcounter as a simple web analytics tool that is good for privacy, low in cost, lightweight, and simple. This is how I got on with it!"
---

I'm not a big fan of analytics and tracking on the web — I use ad and tracking blockers in my browser, on my device, router, and built into the DNS service I use.

But having some idea of what pages are being visited, how people are using the website, and who is linking to me is helpful information! With that I can learn from what posts did well, put my attention for improvement where it matters, and understand how people use my site so I can make a future redesign and build better!

I have a few requirements for an analytics tool I'd be happy with:

- Privacy-preserving — collect only the information I use, and it shouldn't be used for any other purpose
- Lightweight — no real impact on users
- Simple — I should be able to quickly see the information I need without wading through menus
- Cheap — I don't want to pay more than about £5 a month for it, it's not worth more than that to me
- Self-hosted or a company I trust — either I control the hosting or trust who does to do the right thing

## Analytics options

I had a look into analytics options for a client a wee while ago and judged them against my requirements:
|              Tool | Privacy | Lightweight | Simple | Cheap | Hosting |
|:------------------|:--------|:------------|:-------|:------|:--------|
|  Google Analytics |      ❌ |           ❌ |     ❌ |     ✅ |      ❌ |
|            Matomo |      ✅ |           ❌ |     ❌ |     ✅ |      ✅ |
| Netlify Analytics |      ✅ |           ✅ |     ✅ |     ❌ |      ✅ |
|         Plausible |      ✅ |           ✅ |     ✅ |     ❌ |      ✅ |
|            Fathom |      ✅ |           ✅ |     ✅ |     ❌ |      ✅ |
|           Countly |      ✅ |           ✅ |     ❌ |     ✅ |      ✅ |
|             Umami |      ✅ |           ✅ |     ✅ |     ✅ |      ✅ |
|       Goatcounter |      ✅ |           ✅ |     ✅ |     ✅ |      ✅ |

Plausible and Fathom both seem like great options, but for a personal site, small hobby project, or small business they are just too expensive for me. Analytics are helpful and I don't want to diminish the value of the work these companies do, but I don't personally put enough value in analytics to be worth paying for these services.

I mostly host on Netlify at the moment who have a server-side analytics offering but it's expensive and would lock me in with them instead of being able to switch hosting so that's not an option for me.

Countly and Umami seemed pretty cool, both can be self-hosted and I gave them a try for a couple months. Countly I found a pain to maintain — upgrades and maintenance took a lot of work. Umami seemed really cool but a little rough and slightly buggy when I last looked at it.

I ended up settling on Goatcounter!

## Introduction to Goatcounter

Goatcounter is a super simple analytics tool that is open-source and can be self-hosted. There's a public instance that you can use for free, supported by donations.

It collects the bare minimum of data (and allows you to customise that), is lightweight, you can export data, and even has no-JS options!

It is also really not a pretty interface! 😅

<img class="measure-long rounded" src="{% src 'goatcounter-dashboard.png', 1077 %}" srcset="{% srcset 'goatcounter-dashboard.png' %}" sizes="{% sizes 'full' %}" alt="Goatcounter dashboard, showing a primitive but functional interface with date controls, and a list of pages on this site with visitor graphs" width="2674" height="1584" loading="lazy">

## Setting up and using

But it doesn't need to be! It's just an analytics tool lol.

I haven't self-hosted but setting up via the public instance is easy — sign up via the website, it gives you a `script` to embed into your site, pop that in and you're good to go!

There are a lot of settings you can use to tailor exactly how it should behave. I've customised the data collection to disable "Individual pageviews", "Session", "Region", and "Language" as it's not information I'm very interested in. You can even "Show fewer numbers" if you're just interested in general trends and don't want exact numbers!

In terms of using Goatcounter it's pretty straightforward. In the Dashboard interface you can filter the view by date or path from the top bar and then below you get widgets showing you the key information about:

- Page views
- Referrers
- Browser and OS versions
- Countries
- Screen sizes

<img class="measure-long rounded" src="{% src 'goatcounter-details.png', 1077 %}" srcset="{% srcset 'goatcounter-details.png' %}" sizes="{% sizes 'full' %}" alt="Goatcounter dashboard, with graphs representing top referrers, browsers, operating systems, countries and screen sizes" width="2674" height="1584" loading="lazy">

The interface isn't pretty but it's very functional and actually does the job really well. I've considered doing a custom theme for clients as I think they'd shy away from Goatcounter purely due to the interface design, but not quite yet.

This has everything I want from my analytics in a single page I can check in the time it takes the Google Analytics dashboard to even load, let alone work out how to find the information I'm looking for!

## On privacy

As mentioned at the beginning of this post I'm not a big fan of analytics in general, but there is a huge difference between the likes of Google Analytics and Goatcounter, Plausible and friends.

My line sits much closer to the Goatcounter end. I understand the value in website owners knowing who is visiting their website and being able to use that information to improve their website and writing. But that shouldn't come at the cost of tracking individual user behaviour and selling it to third-parties.

I also don't like the absolutist view that server-side logs are the only reasonable source for analytics. Relying on server-side logs only ties you to specific hosts and tools, limits you in hosting choice and performance, significantly complicates offline-first or distributed CDN architectures, and are typical much weaker at identifying bots.

I'm happy with a JS analytics provider that has a solid privacy policy, only collects and stores what's needed for aggregate reports and is open-source. Ideally I would self-host it also, and that's something I'll be looking into.

Finally, the ePrivacy directive and consent. I'm currently not including an opt-in consent dialog and instead focusing on making sure the analytics are as friendly and minimal as possible. I do believe that there is a strong case for ePrivacy requiring opt-in consent for even "cookieless" analytics ([see Neil Brown's fantastic post on decoded.legal](https://decoded.legal/blog/2024/08/web-analytics-tools-using-javascript-cookie-consent-and-the-uk/)). For my work though I want to strike a balance between collecting some useful data, respecting privacy as much as possible, whilst also avoiding a consent banner.

If you wish to opt-out of analytics on this website you can enable [Do Not Track](https://www.eff.org/issues/do-not-track), the [Global Privacy Control](https://globalprivacycontrol.org), or <button class="btn-link" onclick="window.location.hash = '#toggle-goatcounter'; window.location.reload()">toggle analytics</button>.

## Final thoughts

Goatcounter is a fantastically simple analytics tool that lets you get the key data you need to see how your website is doing. In terms of privacy it's pretty good, it's cheap, lightweight, and you can self-host it.

I'm really happy with it, and will consider self-hosting and using on most of my personal projects going forward!
