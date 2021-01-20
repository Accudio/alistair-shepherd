---
title: Fixes for Koken Problems
date: '2020-09-17'
excerpt: Koken is an old CMS for photographers I've worked with, these are some fixes for those still using it.
metaDesc: Koken is a CMS for photographers, these are some fixes including forgotten password reset and PHP 7.
---

[Koken](http://koken.me/) was a self-hosted Content Management System built for photographers, offering off-the-shelf features like Adobe Lightroom integration, EXIF handling, album categorisation and much more.

5 years ago, if you were looking for a free photo management website you could host yourself, Koken was a great option. I started with Koken for a photography client in 2014, and decided upon it based on the great documentation and very easy theme development.

Note: I would highly suggest against anyone setting up a new Koken site now. I'm not even sure if it's possible! This is for people maintaining their existing sites.

<img
	src="{% src 'monolith-koken-theme.jpg', 763 %}"
	srcset="{% srcset 'monolith-koken-theme.jpg', null %}"
	sizes="{% sizes [
		'(min-width: 50rem) 763px',
		'calc(100vw - 2.66rem)'
	] %}"
	width="763"
	height="458"
	alt="Screenshot of a website. The headers says Monolith - Koken Theme by Accudio"
	loading="lazy">

## History of Koken

Koken's public beta was released in Early 2013, and got fairly popular pretty quick. It's creator [Todd Dominey](https://www.todddominey.com/) nailed what photographers wanted and needed from a self-hosted CMS. Although it became stable and fairly well-supported, it never made it to 1.0.

Fast forward a couple years and in 2015 Koken is [bought by NetObjects](http://blog.koken.me/essays/2015/10/netobjects-acquires-koken/), a software company which in the 90s had success with a desktop site-builder.

NetObjects continued to update Koken for around 2 years  (although focusing on premium functionality), with the last release of v0.22.24 in August 2017. As far as I am aware, there has been no further development of Koken since then. The help centre and social media was active for about another year before they also had no further updates.

As of 2020 Koken still functions, but has some major issues. The store and documentation went offline sometime around the end of 2019 which obviously makes development harder and prevents the easy installation of themes, plugins, and even causes issues with logins on some older versions.

There was a Community Koken Forum called Koken Community, but as Koken died it went not long after, understandably given the lack of any official support.

## My relationship with Koken

Every few weeks I get a message on twitter or an email from someone asking for help with their Koken site. This is because I have the 'honour' of being the last tweet on Koken's [twitter @koken](https://twitter.com/koken). In 2017 I developed a theme for Koken for the previously mentioned client called Monolith. Over the end of 2017 and early 2018 I refined this and released it onto GitHub open-sourced under a GPL-v3.0 license. At this point I was unaware of the problems going on with Koken and perhaps had I known that client would be on a different platform.

Since 2017 I have been maintaining a Koken site, and have encountered a few problems that I am consistently asked about. These are my fixes for them, I hope they help!

Note these are all made on v0.22.24 and may differ for previous versions.

## "Cannot connect to the API" on login, PHP 7+

When using Koken with PHP 7+ (confirmed on PHP 7.3 and 7.4) and visiting /admin/, you may get a red error box appear with "Cannot connect to the API" without any further error message. Usually this appears with a database error etc, but this is code related. To fix it:

In your installation, find `/app/database/DB_Driver.php` and take a look at line 1018 and you should see something like this:

```php
else
{
	$args = (func_num_args() > 1) ? array_splice(func_get_args(), 1) : null;
	if (is_null($args))
	{
		return call_user_func($function);
	}
	else
	{
		return call_user_func_array($function, $args);
	}
}
```
Now, replace line 1028 (the $args declaration) with the following two lines:
```php
$func_args = func_get_args();
$args = (func_num_args() > 1) ? array_splice($func_args, 1) : null;
```
The code should now look like:
```php
else
{
	$func_args = func_get_args();
	$args = (func_num_args() > 1) ? array_splice($func_args, 1) : null;
	if (is_null($args))
	{
		return call_user_func($function);
	}
	else
	{
		return call_user_func_array($function, $args);
	}
}
```

## Images not loading, PHP 7+

You may not notice this immediately if you have images cached, but if you cleared the cache or uploaded a new image you may find it is not rendered. This can also occur in PHP 7+ (confirmed with 7.3 and 7.4) and is another easy fix.

Find `/i.php` in the root of your installation. On lines 13 and 14 there is the following:
```php
require $root . '/app/koken/Shutter/Shutter.php';
require $root . '/app/koken/Utils/KokenAPI.php';
```
Replace those lines with:
```php
require_once $root . '/app/koken/Shutter/Shutter.php';
require_once $root . '/app/koken/Utils/KokenAPI.php';
```

You also need to open `/app/koken/Shutter/Shutter.php` and on line 274 replace the following:
```php
include dirname(__DIR__) . '/Utils/KokenAPI.php';
```
with:
```php
include_once dirname(__DIR__) . '/Utils/KokenAPI.php';
```

## Forgotten Password

First try to enter a wrong password and click the "Forgot Password" link that appears in the bottom right. This is the easiest way on more recent version of Koken

Unfortunately however it seems that previous versions relied upon store.koken.me in order to offer forgotten password functionality. We can still reset the password, but it's a bit more manual.

You need access to your koken database for this, whether than be through phpmyadmin, another database management tool, or mysql on the command line. I won't bore with the exact commands/clicks required for each, just the general process.

1. Gain access to the database. If you don't know the login details, you can find them in `/storage/configuration/database.php`;
2. Go to the `koken_users` table. This should have only one entry, your user with associated email etc;
4. Copy the `internal_id` for the user;
5. Then go to "http://yourwebsite.com/api.php?/users/reset_password/" with the id at the end of the URL;
6. Visiting that link should send the email attached to your account a new password

## Conclusion

If you haven't gathered from the rest of this post, unfortunately Koken is dead. I will continue to maintain a Koken site as my client cannot afford the cost of a rebuild and relies upon the Lightroom integration, something I haven't seen anywhere else. I would however say you shouldn't be setting up any new Koken websites, and if you still have one you should be seriously looking at alternatives.

There is a [change.org petition](https://www.change.org/p/netobjects-relinquish-koken-to-opensource) calling on NetObjects to open-source Koken but I am not hopeful. They are a commercial software company, and most software companies will cling to thier code to the end.

A couple of people have asked me about alternatives now, so I've included a list below. Unfortunately there's nothing quite like it Koken but hopefully one might fill your needs

If you have any further issues with Koken then feel free to leave a comment and I'd be happy to help.

## Koken Alternatives

### Custom-built website

As a freelance developer I am more or less obligated to suggest that if you have the money, the best solution you will get will be through a web developer or development agency. This can be the design you want and function exactly as you need. If you're interested in my services as a developer or want some throughts on what you need, feel free to get in touch.

### Hosted Photography Solutions

There are hosted photography portfolio services out there including:
- [Pixpa](https://www.pixpa.com/)
- [Photoshelter](https://www.photoshelter.com/)
- [Format](https://www.format.com/)
- [Clickbooq](https://www.clickbooq.com/)

I haven't used any of these platforms but I have heard they are reliable and easy-to-use and not too expensive.

### Hosted Websites

For a bit more work you could use a hosted website builder like [Squarespace](https://www.squarespace.com/), [Wix](https://www.wix.com/), or [WordPress.com](https://wordpress.com/). This will give you a bit more flexibility than a platform designed to fill a niche.

## WordPress

As much as [WordPress](https://wordpress.org/) can have a bad reputation, if you consider themes and plugins carefully then you can get a great looking and performing WordPress site for photography.

It's worth looking for themes that are designed for photography so functionality like EXIF data, lightboxes, and copy protection is included. I don't have any examples but there are several free ones on the official theme directory and many options in commercial theme directories like ThemeForest.

## For more Technical...

If you're fairly technically minded, there are also some great programs designed to generate a static website from your content and once you get used to them are really quick and simple.

One I've come across is called "Prosopopee" ([github.com/Psycojoker/prosopopee/](https://github.com/Psycojoker/prosopopee/)) and is designed for photography websites and features everything you'd need. It's a bit more involved to publish content as it's done with text files rather than a GUI or Lightroom integration, and you'll probably initially need a developer to make it look how you'd like but that wouldn't be too hard to come across.

Not focused on Photography, but again for the more technical 11ty ([11ty.dev](https://11ty.dev)) is a static site generator that could absolutely work as a brilliant image gallery. You'd also probably need a developer to get the initial site going and perhaps integrate it with a headless CMS, but with a bit of extra work you can get a system that's a lot more flexible and resilient.

If I were to set up a new site for a photographer, this is probably the direction I'd go down. I've been burned by Koken dying in only a few years, a static site and static site generator will be around a lot longer than that.
