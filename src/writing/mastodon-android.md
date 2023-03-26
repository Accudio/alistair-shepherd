---
title: Searching for a Mastodon app for Android
date: '2023-03-26'
excerpt: "There are plenty Android apps to access Mastodon and the Fediverse, which one works best for me?"
metaDesc: "There are plenty Android apps to access Mastodon and the Fediverse, which one works best for me?"
---

I've been using the Fediverse via Mastodon since October 2022, as a pretty much complete replacement for Twitter. I'm loving it! The community feels a lot more friendly and accessible than Twitter has done in a long time and I'm very happy to be out of the Twitter shitshow.

You can find me at [accudio@mastodon.scot](https://mastodon.scot/@accudio) and if you're not on the Fediverse yet come join us!

Now onto the actual topic of this post, trying out various Mastodon or Fediverse apps for Android! I've been using [Twidere](https://twidere.com) since I started, originally because it supported both Twitter and Mastodon and therefore allowed me to transition slowly. I removed Twitter after a few weeks but kept the app as it's decent. Unfortunately however lately I've had it crashing upon seeing particular posts. That means I have to clear the cache and data before re-using it &mdash; not ideal!

Hence my search for a new app, but first...

## How I use social media and 'must-haves'

I used Twitter &mdash; and use Mastodon &mdash; in a very particular way. Normally I check in maybe 2-3 times a day, depending on how busy I am. When I start my app, I want it to be exactly where I left off when I last used it. I then go through 'catching up' on what's been posted since I last checked, and once I'm done I finish and get back to work/play. When I next check it I continue from where I finished.

I have a pretty curated feed so this doesn't tend to take me very long and means I don't miss anything from the folks I really care about. I use mutes, hide retweets and separate RSS feeds to keep track of others in a less instant form.

This way of using Twitter and Mastodon is ideal for me, and is the most healthy relationship I've had with Social Media as once I'm 'caught up' there's no more scrolling to do!

I have just one 'must-have' for a Mastodon app (beyond the very basics of loading posts) and from how I use it that'll probably be pretty clear! I need the app to keep track where I am in my feed, no exceptions. I don't mind if loading more posts is automatic or manual, but it has to happen around my scroll position so I don't lose track of where I am. Any other features are a bonus!

## The contendors

First, thank you so much to [everyone who gave me recommendations when I asked](https://mastodon.scot/@accudio/110057755928969826) last week, most of these suggestions came from those recommendations.

If there are any good ones you know of that I haven't mentioned then please let me know!

### Tusky

[Tusky](https://tusky.app) was the most common recommendation I got and it's pretty good! Modern design, very quick, great support for Mastodon features like Polls, editing, displaying of alt text, all of which is beyond Twidere.

Unfortunately, when I'm scrolling up and tap "Load More" it pins me to the top of the new posts rather than the bottom, requiring me to scroll back down to find where I was beforehand. I tried to stick with it for a bit because I really like the other features but it just frustrated me unfortunately.

### Husky

[Husky](https://husky.adol.pw) is a fork of Tusky and has pretty similar features, mainly focused around Pleroma servers. I don't use a Pleroma server so most of these aren't too major for me as a Mastodon user.

Sadly it faces the same issue as Tusky with loading new posts

### Official Mastodon app

I like the design and feel of the [official Mastodon app](https://f-droid.org/packages/org.joinmastodon.android/) but compared to Tusky and Husky the comparitive lack of customisation kinda sucks. That said, if it can load posts in the way I want it to then that's nothing...

Once again, no it can't. Tapping "Load more posts" pins you to the top (newest) of the loaded posts rather than the bottom (oldest). Another fail :(

### Megalodon and Moshidon

[Megalodon](https://sk22.github.io/megalodon/) is a fork of the official Mastodon app that adds support for some pretty handy features like a Federated timeline, more control over posting and image descriptiong viewing. [Moshidon](https://lucasggamerm.github.io/moshidon/) is a fork of Megalodon which also adds support for remote local timelines.

Both are cool but suffer from the same issue as the official app when it comes to loading posts.

### Mastodon website

I don't necessarily need an app really, I'm perfectly happy to use a website or Progressive Web App instead if that works better. That said, thanks to Gogle being anti-competitive, monopolistic jerks my phone doesn't support Progressive Web Apps properly. So I'm restricted to the Mastodon website of my server as viewed through my browser, no PWA install superpowers.

And this ends up worse than the apps unfortunately! If I load it up having not used it in a few hours the page loads fresh and I'm placed at the top of my feed with the latest post. Absolutely no can do unfortunately.

I can't test how it works as a proper PWA, but giving it the benefit of the doubt I'm blaming this one on Google.

### Elk

[Elk](https://elk.zone) is a third-party website and PWA for a few different Fediverse servers that is pretty great for customisation and accessibility.

It's another casualty of Google it seems, loaded at the latest post losing track of where I was. It's a great website though so I might switch my desktop use to it, but it doesn't work for my mobile use.

### FediLab

[FediLab](https://fedilab.app) is the best shot yet. It seems a bit rougher than the other apps but works extremely well, with most of the customisation I'd want and loads of super handy features like showing Alt text, automatic privacy-friendly translation, and support for alternative frontends for sites like YouTube, Twitter and Instagram.

This is the first app that copes with my style of browsing the feed! It keeps track of my place in the feed and when I scroll up there's a "Fetch more messages" button that lets me choose whether I want to be placed at the newest first or the oldest &mdash; ideal!

I've been using FediLab for about a week, and it's sadly not the success story I hoped it would be. In theory it handles keeping track of scroll position fine but in practice it's not perfect. One in every 3 or 4 opens of the app it will misplace me by a certain amount up or down, making me spend time working out where I was before. Sometimes I think it's just not saving my position during an entire session and the next time I'll be back to where I started.

I really want to stick with it because it's a really solid app and nice experience but after a week of use I don't think I can.

### Twidere

So that leaves me... exactly where I started? Even with the crashing and all of the Mastodon features it's missing, [Twidere](https://twidere.com) meets my requirement of how I use the app the best. It's tracking of scroll position is rock-solid and that part of it hasn't had any issues at ll whilst I've been using it.

In terms of the crashing, it seems to happen about once every 4-5 days on average, and I haven't put the time into working out exactly what's causing it. To fix it, I need to clear the data and cache of the app and restart it. I'm still logged in at that point, but it's lost all of my customisation. However, there's a way to export your settings to a file so I can re-import that after it's crashed to fairly quickly get back to where I was.

It's a faff, and means when it does crash I lose where I was but that's a lot less frequently for any of the other apps.

I'll miss all of the features of the others, when I want to vote in a poll for example I have to open the post in my browser, copy the URL and paste it into my home server. A bloody pain, but I don't use polls that often. I think the thing that I miss the most is not being able to see an image's alt text within the app, making it hard to keep my my policy of "No alt no boost".

## Finally

So there we go, that's a summary of how I switched my Mastodon app usage from Twidere to Twidere! If I've missed a setting on any of the apps that would make them work better, or you have any other suggestions then please let me know!

And once again, join me on the Fediverse at [accudio@mastodon.scot](https://mastodon.scot/@accudio), and if you aren't on the Fediverse then come join us! [joinmastodon.org](https://joinmastodon.org) is a great place to get started.