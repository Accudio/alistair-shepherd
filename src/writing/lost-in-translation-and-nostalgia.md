---
title: Web Nostalgia and Lost In Translation
date: '2021-08-30'
excerpt: Ramblings about web nostalgia, early web experiments and translating through many different languages
metaDesc: Ramblings about web nostalgia, early web experiments and translating through many different languages
tags:
- Rambling
- Open Source
---

When I was a kid growing up in the early 2000's, one of my favourite things was the family computer. And along with that a trusty booklet that came with one of my dad's PC magazines - "100 great websites". I remember spending days and days visiting every website listed in the book many times over, taking notes about my favourites.

My first search engine experience came from this when Altavista was going to be the big player in web search (according to the book). The book had everything from the finest web portals, random neocities pages with all sorts of wacky graphics and the early web experiments that captured my imagination.

One of those experiments I remember the best was called "Lost in Translation". Like most of the sites and links I remember it's long dead now, but at the time it was my favourite. Lost in Translation used the then-new Babel Fish Translation (later bought by Yahoo) API to take any input text, translate it through several different languages and return the resulting garbled mess back in English. I couldn't wait to get home after school, pretend I was doing schoolwork and instead try all sorts of sentences and phrases and see how they turned out.

Fast forward 20 years and I'm a web developer myself. It's almost certainly that booklet and those sites that started me on this journey and made me fall in love with the web. Lost in Translation is still something I think about every so often, an example of what the web was in those days and something I'd like a bit more of now.

Anyway, I was asked by some friends to make a quiz round. Inspired by Lost In Translation, I thought I'd make a quiz round where recipe titles were run through several languages and you had to guess which one. I'll be honest - the round was absolute fucking shite. The average score was 1/10 and the very best 4/10 - I had created questions so bad people did worse than random guesses would provide.

The result of it wasn't all bad though. When I was testing using the Google Translate UI I realised some recipes stood unchanged whilst some completely lost almost instantly. (Turns out that translating modern fad-based recipe names into little-known isolated languages doesn't work too well.) I realised I'd need to do this quite a lot, so wrote a small bit of JavaScript using the Google Translate API to make the process a bit easier.

There's nothing special about it, but having some code that replicates that functionality of Lost In Translation turns out to mean quite a lot to me. It's simple, only took me about an hour (most of which was trying to get a free translation API working) and has achieved it's purpose - but I'm unable to just let it go.

Putting it and these words on the internet pleases the archivist in me, the same part of me that is sad I no longer have that booklet and link rot made it practically useless anyway.

I was just trying to write a basic readme when this monologue came, but I guess now there's morals about link rot, web archival, nostalgia and wishes for a better web.

But enough of that, [have some fucking code if you want it](https://github.com/accudio/lost-in-translation).
