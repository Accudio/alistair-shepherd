---
title: Selling a small front-end web project — what I learned
date: '2024-09-16'
excerpt: "In mid-2024 I sold an small unmonetised web project of mine called My Top for Spotify. This is my experience of the sale and what I learned!"
metaDesc: "In mid-2024 I sold an small unmonetised web project of mine called My Top for Spotify. This is my experience of the sale and what I learned!"
---

In 2017, I made a small web app for interacting with the Spotify API — mostly to learn some new technologies. Surprisingly it took off, getting quite a lot of visitors despite my lack of interest in developing it further or monetising it.

Earlier this year someone reached out to me asking about my plans for the project and whether I would be interested in selling it. Fast forward a few weeks and I have sold my first web project and learnt a lot in the meantime!

I didn't find much information online about the process of selling a project, particularly one without any monetisation and at a small scale. This is my attempt at helping others who may end up in this position.

That's the TLDR; stick around for more detail!

## About My Top for Spotify

So the project is called [My Top for Spotify](https://mytopspotify.com). It's a pretty small web app built on React that allows a user to connect their Spotify account and see what the Spotify API says about their top artists and songs over a few different time periods.

In early 2017 I was looking to move from freelance development into a permanent role, and loads of jobs were looking for React experience. I'd done the standard hello world and to-do app, but wanted something live, real-world, and app-like for the experience and a portfolio piece. I built it with Create React App and a server based on AWS Lambda and Serverless. To be honest I really don't like the tech stack, and it was the start of my dislike of those two products — but that's not what this post is about!

I cracked it out in a few weeks, the functionality is pretty straightforward and the design has some cool CSS details but overall unpolished. But it was just a demo for me and a few friends so who cares right? I named it My Top for Spotify, purchased a .com and .io domain and deployed, shared it around some friends and family and that was that.

Quite quickly it started to get quite a lot of traffic, ranking highly on search engines, and being mentioned in blogs and YouTube videos. I believe this is because just a few months earlier Spotify released their first Spotify Wrapped — an annual review of your Spotify listening. This seemed to drive loads of interest in seeing this kind of data, and my little experiment ended up top of the search results for queries like "See top Spotify tracks".

And then I basically did nothing! The app got about 4 million annual visitors in those first few years, and I just left it. I considered further work and monetisation but didn't have much interest in that — particularly not in turning it into a business. I paid the hosting and domain costs for it myself, did the odd urgent fix or upgrade and otherwise let it be. After that initial deploy I probably spent about 10 hours on it total over a period of 7 years.

That's where it sat as of May 2024, getting about 1–2 million views a year.

## Thinking about selling

I received an email out of the blue earlier this year, asking if I had any plans for the project and if I would consider selling it. I was pretty confident this was a spam email to be honest — perhaps I'm too suspicious! Regardless, I replied with mild interest and frankly saying it was something I hadn't even considered.

What followed was a lot of emails back-and-forth, discussing the project and their interest. The whole process went pretty quick, even despite a time difference between the me in the UK and the buyers in Australia. Within six weeks of that initial email we were making the transfer.

After those first few emails I became very aware I had no idea what I was doing. Searching online brought up some guides and articles, but only a handful that were relevant to a small-scale project that doesn't earn any money. [Patrick McKenzie](https://training.kalzumeus.com/newsletters/archive/selling_software_business) has a good article which I would suggest reading, especially for selling a small SaaS.

I am also fortunate to have some great people in my 'network' that gave me advice, including my parents, folk I work with at Series Eight, and online friends on Mastodon and Discord. A particularly huge thank you to [Jan Lehnardt](https://narrativ.es/@janl), who kindly spent some time on a call taking me through his experience and helping me work through my priorities and the risks involved. [Kilian Valkhof](https://kilianvalkhof.com) also gave me much-appreciated advice from selling a similar size of project.

## Why sell, and my priorities

The main reason I was willing to sell My Top Spotify was because it was going to waste under me. I invested close to nothing into it — AWS and domain costs and the odd hour when there was an SSL cert issue or Netlify needed an update.

I had no intention of doing anything further with it, and there is now more competition in the area — companies actually investing in their products to add new features and gain more visibility. That resulted in a decline in popularity to other tools investing in features and marketing. Ultimately I didn't give or receive much value, and people willing to invest time and money could do a lot more with it.

Because I wasn't planning on selling it originally, that gave me a bit of power over negotiations and the decision — at least in my head. If I decided that I wasn't happy with the arrangement I wouldn't be any worse off — so I could be picky.

On being picky, it was very important for me to consider my priorities for the project and for the sale:

- The buyer should appear to care about the project;
- I had to be confident it wouldn't be immediately strip-mined of value or users exploited maliciously;
- A fair offer (more on that shortly);
- No major risk from me — money before permanent transfers;
- Any additional fees covered by the buyer – common but not standard.

Those were the principles I decided I wasn't willing to compromise on, and I think that was extremely helpful for me to focus on.

I've seen and heard of web projects being strip-mined of value, becoming riddled with ads, or even injecting malware. I really worried about that, and it was the main thing that held me back.

As for the money and risk, as someone new to all this making sure I wasn't about to screw up was really important. Jan was fantastic helping me work through the risks I was and wasn't comfortable with.

## How do I value an unmonetised side project?

Okay so I had a stable project with lots of visitors, great search engine ranking, low outgoings, and a pretty promising future.

So what is it worth?

Wherever I looked online, the first step to answering that was "how much does it earn?". At a big fat zero that makes it tricky! I tried loads of domain evaluators — ranging from $100–$100k — and the calculators of various project 'marketplaces' do not handle that situation well at all. I could find essentially no good blogs or details that accounted for selling a free project based on potential rather than revenue.

Eventually I gave up and decided to ask the buyer "How much are you going to pay for it?", and see what happens. Their suggestion was what we based our final amount on — assuming the site become advertising-funded and basing the value on [Google's AdSense estimator](https://adsense.google.com/start/#calculator). With some negotiation we agreed on how many years to include, and to using an average monthly pageviews from the previous year of my analytics to account for seasonal shifts.

I'm not a salesperson or valuator so I'm sure others would use a different method accounting for repeat visitors, SEO potential, backlinks, domain value and much more. Probably with WAY different numbers. Crucially however I am really happy with this method. The key thing for me is that it's very clear, independent, and objective.

We negotiated details but in the end with the AdSense estimator I could easily weigh up the comparison between implementing ads myself and receiving ongoing funds, or receiving them up-front without the need of ongoing maintenance. I'm sure that there was potential for further valuation but this method felt fair to me and the buyer.

I'm not going to detail any of the final numbers we agreed as that's not the point of this. If you're selling something similarly unmonetised then I'd recommend having a discussion with the buyer and see where it goes. The AdSense tool could be handy to reference if that fits the project.

## The mechanics of selling

I've decided I'm selling, we've agreed a price, what happens next?

There were a few things I was unsure about at this point: do we need to use a broker; do I need a solicitor to review contracts; how do we handle AUD → GBP payment?

I had absolutely no idea if a broker would be needed, what it costed and involved, but lots of places online swear by them. Both Jan and Kilian talked to me about the risks vs costs, so combined with the principles I detailed above there were a couple options:
- We use a broker for the domain names, but the buyer pays for it;
- I transfer everything non-permanent — codebase, re-assign DNS, environment variables — and then only transfer permanent domain ownership once I've received payment.

Obviously this depends on the buyer but this second option worked out great for us. It reduced the complexity and fees whilst giving me control and some protection against the risk of things going wrong. From the buyer's perspective there was still some risk but by transferring everything non-permanent I'd proven I was serious about following through.

The contracts discussion was pretty easy also, I didn't need a solicitor and went through it myself — asking a couple friends to check there wasn't anything I was missing. Once again your mileage may vary.
I asked for a few additions — making it clear I wasn't liable for future support, clarifying trademark details, and making sure I was able to write this blog post! All were agreed and easily added.

And finally for international payments, turns out that's an easy one. The buyer took my UK bank account details and used Wise to transfer the amount agreed over at the market exchange rate. Nice and easy!

Once those questions were worked out it went pretty smoothly — the code was already open-source so I had no issue handing that over before we'd signed, what had real value was the domain name. I detailed the tech stack and how it was built, wrote some documentation and tips on ongoing maintenance.

We hopped on a call to finalise the tech setup, answer any technical questions, share environment variables, sign the contract, and finally switch the DNS. Once that was all sorted they sent the payment, and when I confirmed that in my bank account I started the domain transfer.

And that was it! We had a few emails in the following weeks to confirm everything was going well, share Google Search Console and Analytics access and that was that.

## How does it feel?

It feels good! It was a good experience to go through, I feel like I'm doing good by the project that I had basically abandoned, I appreciate the money of course, and it's also a much appreciated new marker of success for me. I'll be sewing on my "website sale" scout badge and putting "Founder with one major exit" on my CV now 😉.

I feel quite fortunate that the people who have bought the project were very helpful and friendly throughout, and seem genuinely keen to develop and improve the project. I'm sure that not all sales go as well and smoothly so I am thankful for that.

## My key takeaways

If you take anything from this post — and for my own future reference — here are my takeaways:

- Work out your priorities, they help you make judgements about process and value;
- You don't necessarily need a broker, you may be able do it without one;
- Unmonetised projects are hard to value, ask for offers. The AdSense Estimator may be helpful;
- Consider adding analytics to projects. It doesn't have to be GA, but page views at minimum are essential for a sale;
- Make sure contracts make clear your support/responsibility post-sale;
- Remember that ultimately as soon as it's sold it's out of your control;
- Don't use an io domain! Read [.io considered harmful](https://www.beep.blog/io/), but also they're more expensive than they're worth for side projects.

## What now?

For My Top for Spotify, I don't really know! There has clearly been some hard work and new functionality like global stats already, and I've been told that they're working hard to evolve and improve it.
I think I'll check in once in a while for the sake of curiosity, but I'm happy to otherwise move on. I wish the new team working on the site all the best with it. If you use Spotify I'd encourage you to check it out at [mytopspotify.com](https://mytopspotify.com) if you're interested.

For me nothing changes. I have no interest in building things with only value in mind, so it'll continue to be things for myself and for fun!
