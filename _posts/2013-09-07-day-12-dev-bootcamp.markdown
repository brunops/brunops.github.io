---
layout: post
title: Day 12 - Dev Bootcamp
date: '2013-09-07T19:59:19-07:00'
tags:
tumblr_url: http://brunopsanches.tumblr.com/post/60590434868/day-12-dev-bootcamp
---

Yes, I'm having a hard time keeping this blog up to date. I'm using the weekends to write the missing entries. Sometimes the day ends and I'm just too tired, so I leave it to the next day. Otherwise I end up writing superficial and completely not useful stuff just to fill the gaps and sleep. But fear not! I'm taking notes during the day, everyday, of what happened, this way I can remember what happened. And add something interesting to it as well.

Friday. I thought I knew something about <a class="vt-p" href="http://en.wikipedia.org/wiki/Object-oriented_programming">OOP</a>, but each page of <a class="vt-p" href="http://www.poodr.com/">POODR</a> just shows me how much I don't. Awesome.


<em>  &#8220;Your design challenge is to manage dependencies so that each class has the fewest possible; a class should know just enough to do its job and not one thing more.&#8221;</em>


Defining a Hash as the parameters of a method is a good way to remove the dependency of the knowing the number and order of arguments from the caller.
{% highlight ruby %}
class Foo
  def initialize(args)
    @bar    = args[:bar] || "some string"
    @baz    = args[:baz] || 123
    @foobar = args.fetch(:foobar, true)
  end
end
{% endhighlight %}

If the parameters of the Foo class change, you won't need to make a change on everywhere it is called. And you can set defaults using the <strong>||</strong> operator. With one exception: boolean values.

The <strong>||</strong> operator acts as an OR condition, so even if <strong>:foobar</strong> is a valid key of the <strong>args</strong> <em>Hash</em>, but set to <em>false</em> or <em>nil</em>, then the condition will fail, and <em>true</em> will be the default value. Unlike the <strong>[]</strong> method that returns nil for missing keys, the <strong>fetch()</strong> method actually expects the key to be present and offers ways to handle missing keys (the second argument in the example).

Okay, it's really cool to learn new things, but I have to admit, the best part of my day was discovering <strong>sl</strong> and <strong>cmatrix</strong> programs. You can install it using <a class="vt-p" href="http://brew.sh/">Brew</a> on a mac, or apt-get on Linux (no clue on Windows, sorry):
{% highlight bash %}
brew install sl
brew install cmatrix
{% endhighlight %}

<img alt="image" src="http://media.tumblr.com/c7577d3233da7f74b402d9f761ebfb86/tumblr_inline_mss555y7L01qz4rgp.png"/>

<img alt="image" src="http://media.tumblr.com/4b2830277ff25d9ef7b6ec2e2607ed75/tumblr_inline_mss53pdpcE1qz4rgp.png"/>

There was an awesome presentation on <a class="vt-p" href="http://en.wikipedia.org/wiki/Test-driven_development">TDD</a> this afternoon, teaching &#8220;The Method&#8221;. Basically:
<ol><li><span>Define the next most simple possible test that will fail</span></li>
<li><span>Run the code and see it fail</span></li>
<li><span>Change the code to make this only test (and all of the previous) pass</span></li>
<li><span>Go back to 1 if there are more cases to be covered</span></li>
</ol>
<span>We have the tendency of trying to figure out the whole problem at once, so it's really hard to stick to &#8220;The Method&#8221;, but the benefits were undeniable. Following this simple algorithm, there's no need to keep too much information in your head at the same time, and you can go back to where you stopped any time. Your final code will have a great test coverage when it's done, and now it's the only time where </span><a class="vt-p" href="http://en.wikipedia.org/wiki/Code_refactoring">refactoring</a><span> will be safe.</span>
