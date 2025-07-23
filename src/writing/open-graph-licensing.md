---
title: 'I displayed an open graph image and had to pay how much?!'
date: '2025-07-22'
excerpt: "A media company demanded a license fee for an Open Graph image used on my twitter archive. I gave in and paid it, but what does that mean for open graph images and copyright?"
metaDesc: "A media company demanded a license fee for an Open Graph image used on my twitter archive. I gave in and paid it, but what does that mean for open graph images and copyright?"
socialImage: '/meta/og/open-graph-licensing.jpg'
---

A media company demanded a license fee for an Open Graph image used on my twitter archive. I gave in and paid it, but what does that mean for open graph images and copyright?

In April 2025, I received an email from an image licensing company (hereby "licensor") regarding an image used on my twitter archive. That image was owned by them, but used as the Open Graph image for a news article. They demanded I purchase a license or face consequences for the infringement of their copyright.

I ended up purchasing the license to make it go away. Although I'm unconvinced I was at fault and it's certainly not a standard copyright case, it was not clear enough for me to risk those consequences. It really doesn't feel right, makes me wary of the Open Graph standard, angry about copyright on the web, and generally pissed off.

It also raises questions about the potential risks of displaying open graph images on the web.
That's the short version, the TLDR. What will follow is me going a bit more in-depth with some of the specific communication and my thoughts.

## Short disclaimer

What I need to make clear from the beginning though is I am not a lawyer. Very far from it, so if you're in this same situation (I feel for you) please just take this as my experience and do your own research and find what works for you. I paid the fee so I also don't know how this would have gone in a court.

I've removed anything identifying — including details about the image itself and company, and paraphrasing all communication. I don't want to get into any further trouble by identifying companies — I've already had the displeasure of that experience before.

## The rough context

I left Twitter in November 2022, moving over to Mastodon as my main source of Social Media. At that point though I enjoyed my digital footprint and wanted to retain a record of my history on Twitter. I used [Tweetback](https://github.com/tweetback/tweetback) to do this, it's an open-source tool written by Zach Leatherman and maintained by some good folk who were in a similar situation to me. You feed it your twitter archive export and it generates a static website showing off your tweets, including some extra functionality like frequency graphs and such. It's a really cool tool for that purpose!

More specifically, it generates listing pages and a page per tweet, with the same URL format as Twitter so you can easily turn one into the other. It acts independently of twitter, downloading the images you've uploaded, and hosting the content directly. Like most social media sites and Twitter itself, when you include an external URL it displays the Open Graph image for that URL.

<details>
  <summary>What is Open Graph?</summary>
  <p>If you're not familiar, Open Graph is a 'protocol' created by Facebook for websites to provide metadata to 'enrich' the display of links on Facebook. Websites can provide details like a title, author, and image that could be presented alongside the link with a <code>&lt;meta property="og:image" ...&gt;</code> element. Tweetback uses the 11ty <a href="https://www.11ty.dev/docs/services/opengraph/">OpenGraph Image API</a> to fetch these images in a privacy-respecting and optimised way and displays them on tweet pages.</p>
</details>

I published my Tweetback archive online with a robots value of 'noindex' so it wouldn't be indexed by search engines, and basically completely forgot about it. I'd reference it every few months maybe and occasionally added new functionality, but as far as I can tell based on traffic info basically no one ever looked.

## The initial email

Okay, that's all the context you need to understand where we're at come April 2025. That's when I received an email in my inbox from an image licensing company which went something like this:

> We have found one of the images from our collection on your website. We own the copyright to images taken by our photographers and add them to a web crawler to scan the web.
>
> We can't find a license from your organisation, so are checking you have a valid license. Please send us a copy.
>
> If you don't have one, this would be a copyright infringement and you must purchase a license for £800 to cover your use in the past. [link to website to manage+pay]
>
> You must also remove the image immediately until you have purchased but that would not be sufficient, you must pay for your previous use also.
>
> [specific details including screenshots, links, etc]

(once again, heavily paraphrased to just give the right impression)

Obviously whilst reading this I shat myself. The price they wanted was pretty damn high (approx £800/€900/$1000), and the language strong. It wasn't mailicious nor did it make direct legal threats — which I do appreciate — but certainly setting a clear impression of "don't mess with us, we're serious like".

## The detailed context

I've explained enough about the setup, so let's go into this specific use and this page.

In 2021 I made a tweet about UK politics, linking to an article from a national newspaper website. Not necessarily one of the bigger ones, but certainly one that most brits would know. It was a classic tweet sharing an article I enjoyed, about how a politician I didn't like was doing something I really didn't like.

That article included an Open Graph image, a photo of said politician speaking. On the twitter archive the page included my tweet — a short statement that summarised the article and my thoughts, and a link to the article. As Twitter would directly, Tweetback displayed the open graph image for that URL below.

That's the image that the licensor was referring to. The newspaper included it in a protocol designed to allow for the showing and sharing of images alongside their links, and then separately the licensor found my use of said image and demanded a license fee.

### On hosting and "use" { #hosting tabindex="-1" }

One detail I missed from the initial version of this post was the hosting situation, which was a big omission! It was in an earlier draft but I must have cut it and not realised. I don't know how much of an impact where the image is hosted legally, but it certainly makes for a different perception and understanding as many people in my mentions questioned it.

I did not download and re-host any open graph images, including this one. Tweetback uses the [11ty OpenGraph Service](https://www.11ty.dev/docs/services/opengraph/), which is a third-party service run by the wonderful folk at 11ty. It accepts a URL and optional width and format, and will request the open graph image for that URL, cache it, and convert it to the specified width and format.

So just to make that very clear, I did not host the image myself and instead relied on a third-party service that requested it for me. That works in a similar way to other social media sites who use open graph — you wouldn't want every client requesting it direct from the server, that's a nightmare in terms of traffic and presents privacy issues too. So instead you have a server that caches it for several days.

That said, my research (more on that in a mo) suggests it may not matter from a legal standpoint. Copyright legislation doesn't make any stipulations about hosting — it's about "use" of an image and that's what the email I received focused on also. This makes sense, if they were addressing hosting then they would have gone to 11ty and not to me. As you'll see below, I asked a follow-up question about hosting, to which they suggested it was the "use" of the image on my site that was the infringement. That would be the same had I hotlinked directly to the newspaper.

There are also countless copyright infringement cases where people have 'hotlinked' images hosted on another site, which is functionally equivalent to linking directly to the paper's copy of the image pulled from open graph. So that precedent makes me dubious that linking directly to the OG URL would have been legally different.

Whether that difference would change the actions of the licensor is a different question entirely however!

## Immediately actions and research

I'd been told if I paid the fee within 7 days, I would get a 10% discount so I had a week to decide if I was going to pay up or not. Waiting wasn't a good option, the price was high enough that the 10% off was significant enough to me if I decided I needed to pay.

So I researched copyright law, tried to find any historic precedent, and asked for help on social media. Thank you so much to everyone on Mastodon and Bluesky who lent me your thoughts or pointed me in helpful directions!

I also confirmed the copyright holder was who they claimed to be and that they genuinely held the license to the image. Regardless of how "good faith" this was, they definitely had the rights to the image!

The key thing I kept coming back to was that it's not like I 'took' this image, it was provided by a newspaper that had presumably properly licensed it and intentionally declared in their markup that this image could be used alongside that link. It's not like there is another use of the open graph protocol, that is it's purpose. But if there's a case around open graph then that's with the newspaper, not with the licensor, which would complicate things.

Looking through legal guidance it became very clear to me that there was not an easy answer here. The justification and explanation used in the email I received seemed correct, and a simple reading of the laws did not immediately identify an exception that my use would come under.

In the UK were this to go to court I understand it would be a small claims court where I would expect to be able to represent myself so I was not immediately looking for a lawyer like you may need elsewhere.

Based on the reading I had done, advice I was given from people in similar situations and my explanation of how open graph worked, I had a short further conversation with the the licensor. In summary:

> Alistair: explains open graph, how I wasn't hosting the image myself, how the site is not public and how I would not have purchased the license had I knew so potential losses are little to none.
>
> Licensor: it's our copyright and we choose to impose a license fee for use. You used it on your site, therefore you owe a fee. We don't care about hosting, we see the image on your site so you need a license. Feel free to raise the open graph discussion with the website you sourced the image.
>
> Alistair: I've found your subsidiary licenses the exact image for £20, I'd happily pay that. That's the price I would have paid if I had intended to license it.
>
> Licensor: that's a different company, they can choose their prices and we choose ours. Either pay the fee we've asked for or not.

## What did I do?

As you'll know if you read the short version, I decided to pay up within the 7 days to at least get that 10% discount.

I believe fairly firmly that had they taken me to court over it it would have been favourable to me — at least more favourable than paying the full license fee. Considering many details — a subsidiary charged much less for the same image, I wouldn't have paid for the license in the first place, the estimated viewership of 0 people, the use of the Open Graph protocol — and looking at previous image copyright cases I was relatively confident of my side of this.

But ultimately, the easiest and cheapest option for me was still to pay. The chance that it was taken further and the potential cost in terms of money, time, energy from me was too high, higher than the license fee — even if I didn't feel it was justified. So I paid the fee and moved on.

## Open Graph images and copyright

Okay so let's simplify and recap my experience:
- An organisation licenses an image from an image licensing company
- They add it to the open graph markup of a webpage
- Another webpage uses the open graph standard to display said image
- Image licensing company then demands a high licensing fee

Frankly, this is so fucked up. But I couldn't find a scrap of information anywhere on the web about the open graph protocol and copyright and the legal picture seems to suggest that's fine. It seems mad to me that there's no existing writing on this — open graph has been around for years and was created by Facebook, but it feels like I'm the first person to run into this as a concern?

I think it raises some serious questions about the risks of using open graph images on the web as an individual or small 'publisher'. According to the licensor, before displaying it I had an obligation to check with the newspaper the license used for the image and obtain one for myself.

This undermines the entire point of the open graph protocol (at least for images). If you have to manually review every image that you include then what's the point in it being a machine protocol?

Obviously, I didn't test this by letting it go to court. As previously mentioned I felt a fairly strong case for myself, but by paying up I've continued to let this be a question instead of being answered. If you're a lawyer who has an answer, or encounter a similar situation and want to stand your ground, please let me know. I'd be really interested to hear anything more solid from people who know more than I.

For me, I am no longer confident in open graph images being trustworthy, and I would not display them on any of my own sites. There is no circumstance where including open graph images is worth the cost I felt forced to pay in this instance.

## Who do I blame?

This was an interesting question a friend asked me about this situation, and made me realise it's more fucked up than I thought. Here are my thoughts about where I would put the responsibility:

### Me

Sure I'm a little biased, but nope. I used an extremely common web standard the way it was intended.

### The photographer

Definitely not, they absolutely should have control over their photo and be able to sell it to a company to license on their behalf.

### The image licensing company

I don't think I even blame the licensor, they owned the image and it's perfectly reasonable to search for misuse of your image and seek unpaid license fees. I do think they should have taken a much more nuanced approach and accounted for the circumstances however.

### The newspaper

I would lay some blame here, they added an image without license for reuse to the open graph meta of their article. However there is no convention or rules that say you can't do that, and I imagine those who did so are completely unaware of the implications.

### Copyright laws

Classic case of blaming the legislation? I don't think so, at least in the UK copyright law and guidance is surprisingly clear and easy to understand. It makes sense to me, and one technical edge case shouldn't need law changes.

### Facebook

Maybe Facebook for not considering copyright within the open graph protocol? With this context I do think it was short-sighted to not account for or be explicit licensing in the protocol documentation. For example making it explicit that providing open graph images comes with a license for re-use in limited context of displaying the URL.

## Copyright on the web

This whole ordeal has made me so fucking pissed off about copyright on the web in general.

At the same time that I'm having to pay far too much money on an image someone provided me implicitly for re-use, people like Nick Clegg are telling the world that AI companies need copyright exceptions. All my writing and images on my site and social media have been slurped up by AI companies and like fuck are they paying me a license fee for any of it.

This image was the open graph image of a front-page story for a major news publication. That article was shared hundreds to thousands of times on social media — do those companies also have to pay a license fee? Did Twitter, Facebook, Reddit etc have to pay the same fee I did if a single person shares that URL? I suspect not.

So it's a classic case of letting the big tech companies and their billionaires do whatever the fuck they want whilst extracting cash out of the people who can't protect themselves as well.

What a cheery note to wrap this up with!

## Re: the clickbait title and image

Finally, I insincerely apologise for the clickbait-y title and accompanying open graph image of this post. When trying to come up with a serious title I came up with the clickbait-y version and knew it just had to be this way.

What's that? You're one of the delightful folk who subscribe via RSS and didn't see the open graph image? Well I wouldn't want to deprive you of the 5 valuable minutes I spent putting this together so here you go, as a little treat:

<img class="measure-long rounded" src="{% src 'image-licensing-og.png', 820 %}" srcset="{% srcset 'image-licensing-og.png' %}" sizes="{% sizes [ '(min-width: 52rem) 800px', 'calc(100vw - 2.66rem)' ] %}" alt="A YouTube-style clickbait thumbnail image. The title (in Lobster uwu) is 'They want *how much* for an Open Graph image?!!'. I'm looking alarmed with my mouth wide and my hands outstretched beside my head. The background is piles of british banknotes, and there's a blurred out money label at the bottom." width="2000" height="1125" loading="lazy">

## Update 23/07/25

Based on questions I got via social media yesterday evening, [I've added a section above about how the image was hosted](#hosting) and asserting that I researched the company in question.

The hosting particularly was a big omission, I meant to include it but I must have accidentally removed it when editing or copying it onto my website. Oops!
