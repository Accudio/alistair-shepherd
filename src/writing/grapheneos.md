---
title: 'GrapheneOS as my daily-driver mobile OS'
date: '2023-01-15'
excerpt: "My experience running GrapheneOS on a Google Pixel 6 over the past few months as my daily-driver phone OS"
metaDesc: "My experience running GrapheneOS on a Google Pixel 6 over the past few months as my daily-driver phone OS"
---

In November 2022 I dropped my previous phone. Actually 'drop' maybe isn't accurate, it was more of a drop-kick into a stone floor. It was pretty beat-up already honestly, this Xiaomi Mi 9T had been dropped countless times and the back was covered in sellotape to keep the glass in. My *beautiful* drop-kick was a bit too much though, and the screen died completely.

I had already been considering getting a new phone for a bit however, as my trusty 9T certainly had it's problems. I'll get onto some of the software issues later, but also the pop-up selfie camera only popped up about 30% of the time (thanks to a Snowboarding accident). I regularly got strange looks as my phone whirred unhealthily and I shook it upside-down to try to get the camera out.

So at this point I was looking for a new smartphone, and for anyone who isn't a big fan of either Apple or Google as I am you'll be familiar with the dilemma. Android is a privacy and security hell-hole where you're expected to get a new phone almost every half an hour. iOS is possible *slightly* better for privacy but expects you to sell at least 3 organs to get the cash to buy a phone. Also [fuck the browser ban](/writing/cma-mobile-browsers-mir/).

Thanks to [Neil Brown](https://mastodon.neilzone.co.uk/@neil), I found [GrapheneOS](https://grapheneos.org), a mobile OS which promises to solve all my problems. I've since been using it for a couple months on a Google Pixel 6 and it's been fantastic. This post is about my experience with it to share the love!

## What is GrapheneOS?

So [GrapheneOS](https://grapheneos.org) is Android... kinda. It's basically the open-source version of Android but with loads of added security and privacy functionality. It's open-source, officially supports all the most recent Google Pixel devices and can be fairly easily installed to replace the default Pixel Android.

By default it doesn't include Google apps or services for security and privacy reasons, so Google doesn't have constant access to your device for their nefarious purposes. It does however support android apps, and you can install Google services in a limited way to ensure maximum compatibility while ensuring it doesn't have full control/access.

It sounded fantastic, Android app compatibility including for apps that need Google services, whilst a priority on security and privacy. That's exactly what I want from my phone.

## My previous mobile OS

So on my previous couple of phones I tried to do something like what GrapheneOS promises. I had a de-googled version of Android, with the [microg](https://microg.org) project adding support for apps that needed Google services.

Unfortunately in practice it didn't work great. Props to all devs involved in making it happen, but so many apps didn't work on it. Some intentionally: "Your phone is insecure, fuck off", some just crashing.

I had to carry a second phone with me that had 'normal' Android on it for my banking apps, most takeaway/food delivery apps, on holidays I was relying on others to order an Uber for me, and mobile gaming was pretty much completely out. There were often workarounds and alternatives for some of these but it was regularly a huge effort just to install an app.

## GrapheneOS installation and set-up

Graphene has a very fancy web-based UI for installing itself onto devices and extremely good instructions and documentation. It was probably the easiest OS install/flash I've ever dealt with, mobile or otherwise.

Compatibility with different computers seems a bit iffy, I couldn't get it working on my Windows 11 desktop (driver issues probably) and work Macbook (USB C-C cable not being right maybe?) but it worked fine on my personal Windows 10 laptop. If you have issues try different computers you have access to and different cables.

You basically just go through all the steps, doing what you're told and clicking the buttons when prompted. I did have some cases where it seemed to stop at random points so I had to re-do some steps when they didn't finish but eventually they all worked and I got it installed.

Set-up was pretty standard Android, minus all of Google's shitty questions about tracking and such. Overall very easy to get installed and set up.

## Multiple Profiles

GrapheneOS has full separate user profiles and encourages users to utilise these to isolate different apps from each other to increase privacy and security. On Android every app can see what other apps you have installed on that user and potentially interact with them, so if you split your apps across different users it limits how much each app knows and can potentially affect.

It also allows you to more easily control what apps are running when. If a user is not 'logged in', none of the apps in it can run in the background.

I got really confused about how to set this up at first. I understood the concept but didn't really get the details about what was being suggested? Looking at what other people did confused me further as it varied so much. Some people would have an 'Instagram' user, others would not use the default user at all, I didn't really get what extent I should be using user accounts.

Once I played with it a bit it started to make more sense. I'd suggest thinking about them as different 'contexts'. I ended up with this user structure:

- Main profile — my 'normal'. Has stuff I use often and anything I want running in the background;
- Social Media — social media apps, allowing me to only engage with them when I explicitly want to;
- Google Services — this is where I have Google Play services installed for apps that need it. Food delivery apps, games and misc apps I need that can't run in my main profile;
- Work — I like being able to have easy-access to my work email and Slack, if I'm out and running late for example. This allows me to keep it out of mind unless necessary;
- Private — stuff that I want behind an extra later of security and a different PIN code. Includes banking apps and anything I wouldn't want my parents to be able to switch to!

## My thoughts on Graphene after a few months

I really like GrapheneOS. Quite often software intended for people who are security/privacy minded compromises a lot on usability but the user experience of Graphene is fantastic. It has a handful of issues—more on that in a sec—but none are major enough to override all of the problems it solves with the mobile OS market.

Some of the things I love about it:

- The user profiles are fantastic for app control;
- Flawless compatibility with *almost* every android app I've tried;
- Improved security;
- Nice additional android settings and controls;
- OS updates that happen in the background that have never had an issue or changed anything unexpectedly (more than I can say about Google and Apple);
- Far better privacy—I noticed how Google ads knew considerably less about me and my life after switching;
- The camera works as well as stock;
- Automatic fully-encrypted app backups;
- Gesture-based navigation works brilliantly.

In terms of battery life and performance, it's been pretty much exactly as normal Android when I tried it before installing Graphene. Performance seems the exact same, and the battery life might even be a bit better with less tracking and more control over background apps.

## Issues with Graphene

There's not many issues, but as I said it's not perfect.

The most notable for me is that Facebook Messenger calls often don't come through to me. Even if I have the app open, someone will call me and nothing even comes up until the 'didn't answer' message appears. Messages work and I can call people fine, but until I come up with a solution I have to occasionally check my missed calls. It's not a terrible arrangement, my friends and family know to phone me if it's urgent.

I've also found a handful of apps that don't work, with Google Play Services or without. So far there's been three, all random games from the Play Store that crash on startup. None I'm that fussed about yet so I haven't done any debugging. It is a very small number compared to the total number of apps that work great.

I normally have an always-on VPN and have occasionally had issues with connecting to the internet with it on. This might be my Wireguard VPN client but I didn't have any problems on my last phone. Toggling it off and on tends to sort it out.

## Google Pixel 6

This post is mostly about GrapheneOS, as the software is what I really care about. If you're planning on buying a phone for Graphene though, I'll mention my experience with the Pixel 6.

I bought a refurbished device rather than new for climate reasons and to not give money to Google directly. After the first device being a store model stolen from an o2 store and unusable, the second one was in perfect nick and as new.

It's a bit big, I think I maybe should have gone for the Pixel 6a as that's slightly smaller, but I manage it okay with fairly big hands. It is slippy so I'd suggest getting a skin or case for it. I've got a [Spigen Liquid Air](https://www.spigen.com/products/pixel-6-case-liquid-air) which isn't too thick and offers a bit of protection whilst still feeling pretty premium. I don't like the shape of the back with the big raised camera, but the case makes that a bit less major.

The camera quality is good, I'm not sure it's up to all the hype from the many adverts I've seen but it's better than my previous phones.

The fingerprint sensor is pretty crummy unfortunately, the worst I've used before. It works, but fairly often I have to try multiple times to get in. I originally wondered if this was Graphene, but from some searching it seems to be the phone hardware.

Overall, it's a decent phone for a decent price. A good one to go for if you're buying a new phone for Graphene. I wouldn't recommend it without Graphene though, it's not worth the Google spyware.

## Conclusion

I'm a big fan of GrapheneOS and it's pretty much nailed the perfect mobile OS for me at the moment. I've got more control over my phone, how I use it, how apps run on it, and who it reports back to than I ever have before.

I would highly recommend it for anyone considering a new phone, especially if you're considering privacy, security or control over your device.

Feel free to [message me](mastodon.scot/@accudio) or [email me](mailto:alistair@accudio.com) if you have any questions about it! I'd be happy to help. 👋
