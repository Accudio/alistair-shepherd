---
title: Displaying Hillwalking routes on the web with GPX files and Leaflet
date: '2023-01-23'
excerpt: "Display GPX route files from a GPS tracker on the web using Javascript, Leaflet and an Outdoors Tilelayer"
metaDesc: "Display GPX route files from a GPS tracker on the web using Javascript, Leaflet and an Outdoors Tilelayer"
tags:
- JavaScript
- Hobbies
---

I do a lot of hillwalking and use [OsmAnd](https://osmand.net) for maps on my phone and route tracking. I have a couple paper maps and a compass just in case, but for most walks my phone does great. OsmAnd uses Open Street maps for it's data which is fantastic, and has a set of map tiles that look pretty similar to Ordnance Survey maps and I like.

I track my routes for posterity so I know how long particular walks have taken for if I come back to them again some time. I don't really do much else with them though, and with an itch to build a new site for myself I wondered if I could do something with the route files.

## Enter Leaflet

[Leaflet](https://leafletjs.com) is a fantastic open source JavaScript library for displaying and interacting with Open Street Maps on the web. Think of it like the Google Maps JS API but totally free, lacking the horrendous tracking, and more customisable.

Leaflet is pretty easy to get started with, I'm going to use the CDN url:

{% CodePen "https://codepen.io/accudio/pen/yLqvROg" %}

In the HTML I'm loading the script and CSS for Leaflet and have an HTML element for the rendered map. In the CSS I'm just displaying that map fullscreen.

In the JavaScript we initialise a map on the `#map` element and set the starting co-ordinates and zoom level. We then add a Tilelayer, which is basically the images that make up the map, along with credit details and then add it to the map.

There we go! We've got a simple map.

## GPX Route Files

I can export my routes from OsmAnd in the format GPX. GPX is short for "GPS Exchange", and it's an open standard that's used by lots of different GPS devices and programs for sharing data about routes. It's pretty standard and many GPS and tracking apps will be able to export to it.

I've exported a GPX file to try, and the first thing I notice is it's over 600kB! I'm pretty particular about web performance but I think it's fair to say that is far too large if I can do anything about it.

Thankfully there are various tools to help reduce that filesize. My route tracker is set up to log every 5 seconds so I guess over a 4 hour walk that is a lot of data points, but in reality I don't need nearly that many to show the rough route online. I found [gpx studio](https://gpx.studio) to be handy for editing GPX files, it allows you to import and export, has some handy tools and importantly allows you to view the route on a map. I used the "Reduce number of tracking points" option (the two diagonal arrows) to reduce the number of tracking points from 2,300 to 390 which reduced the file size a lot. I chose that number by cranking it down until I started to lose some of the fidelity I wanted in the route line.

After reducing the points we got down to 36kB. A lot better!

## Displaying the route on the map

The next step was getting the route onto my map. It turns out there's a plugin called [leaflet-gpx](https://github.com/mpetazzoni/leaflet-gpx) that makes that really easy. I upload my GPX file somewhere, include the plugin JS in a script tag and can then use `new L.GPX` to create the route:

{% CodePen "https://codepen.io/accudio/pen/YzjeBMK" %}

I've also got an event listener after this to fit the map to the route when it's loaded. This means I can remove the `.setView()` when creating the map and not worry about the latitude, longitude or zoom level, Leaflet will handle it for me.

When loading the plugin over a CDN I found the included icons didn't load by default, and I had to add the below code to make them work:

```js
new L.GPX('...', {
  async: true,
  marker_options: {
    startIconUrl: 'https://cdn.jsdelivr.net/npm/leaflet-gpx@1.7.0/pin-icon-start.png',
    endIconUrl: 'https://cdn.jsdelivr.net/npm/leaflet-gpx@1.7.0/pin-icon-end.png',
    shadowUrl: 'https://cdn.jsdelivr.net/npm/leaflet-gpx@1.7.0/pin-shadow.png'
  }
})
```

This is fantastic and is almost exactly what I'm looking for! How the map looks isn't ideal though, the default Open Street Map tiles aren't very relevant for hillwalking, prioritising roads and the golf course in this example. Ideally I'd have it highlight the different terrain, walking paths, fences, and feature contour lines at the very least!

## Tilelayers

Earlier we added a Tilelayer to Leaflet, which I said was basically the images that made up the map. In that example we used the tiles provided by OpenStreetMap, the, 'official' and recommended default of Leaflet. That's just one option however, and anyone can use the data from OpenStreetMap to make their own map tiles looking however they'd like.

Turns out there's a bunch of different Tilelayers out there for all sorts of different purposes, and Leaflet supports lots of them! There's a mixture of open-source, free, and licensed tile providers, with [many listed in the Open Street Map Wiki](https://wiki.openstreetmap.org/wiki/Raster_tile_providers). By finding a tile provider that is more focused on hiking and outdoor pursuits I could get a map that was a lot more suitable for my purpose.

I managed to find [Thunderforest](https://www.thunderforest.com), which is a company that offers a range of maps, and crucially an ["Outdoors" map](https://www.thunderforest.com/maps/outdoors/) that has contour lines, forests, walking trails and hillshading—perfect for my hillwalking maps! They run their maps as a commercial product with API keys, but have a generous free "Hobby Project" tier that is perfect for my use.

We can switch it out really easily by changing the URL used in the `L.tileLayer` function. Thunderforest also requires us to update the attribution in the bottom-right corner of that map so I've done that here too.

```js
new L.tileLayer(
  'https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=xxx',
  { attribution: 'Maps © <a href="https://www.thunderforest.com">Thunderforest</a>, Data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>' }
).addTo(map);
```

## Result

Put that all together and we have a handy little widget that allows me to view and display my walking routes on the web!

{% CodePen "https://codepen.io/accudio/pen/KKBQJOy" %}

This was a fun little experiment that was to test the waters for a potential future project. If you're interested to see what I do with this (no prizes for guessing) then [follow me on Mastodon](https://mastodon.scot/@accudio)!
