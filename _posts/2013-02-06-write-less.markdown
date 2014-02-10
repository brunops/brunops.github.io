---
layout: post
title: Are you able to write your code in less lines?
categories:
- C
- Software Craftsmanship
---
<blockquote>
<p>Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.</p>
<p>-- Antoine de Saint-Exupéry</p>
</blockquote>
Are you able to write your code in less lines? I'm always asking myself this question. I consider it to be a great way to improve coding skills, I mean, yeah right, you've got your stuff working, but, are you able to improve it? I'm not saying to sacrifice legibility towards less lines, but instead, to face it as an exercise, to test your own abilities. A way to dig deep into your programming language syntax peculiarities.

As soon as I started programming, I considered less code as better code. I sure changed my mind about that now, as you can see in <a href="/get-better-by-challenging-yourself">Get better by challenging yourself</a>, but I still think this is a great way to really understand how statements work and interact with each other.

What are you talking about? Ok, let's see an example. Consider a C code to loop through a string and print its characters

First our declarations, they won't change
{% highlight c++ %}
#include <stdio.h>
#include <string.h>

int i, strSize;
char *str = "my string";

strSize = strlen(str);
{% endhighlight %}
First attempt
{% highlight c++ %}
// Easy problem, give me two minutes..
i = 0;
while (i < strSize) {
  printf("current letter: %c\n", str[i]);
  i++;
}
{% endhighlight %}
Okay, that's a great loop, congratz, but... Are you able to write your code in less lines?
{% highlight c++ %}
// Pfff, that's easy, I was just playing, check out..
for (i = 0; i < strSize; ++i) {
  printf("current letter: %c\n", str[i]);
}
{% endhighlight %}
So you did a for loop, so cute, isn't it? Can you write less?
{% highlight c++ %}
// Of course I can write less, can you read it?
i = 0;
while (i < strSize && printf("current letter: %c\n", str[i++]));
{% endhighlight %}
LESS!
{% highlight c++ %}
// Eat that one lined while, you #%$"&@%!
while (*str && printf("current letter: %c\n", *str++));
{% endhighlight %}
They'll all output the exact same result! My point is, lots of concepts are required to do this piece of unreadable code, like: more than one statement inside a loop condition, pointer arithmetic, operators precedence, and so on!

There are many things you can learn, like:
<ul>
	<li>an empty, infinite, <strong>for</strong> loop</li>
	<li><strong>for</strong> loops with more than one inicialized varible or increment statement inside it, separated by commas</li>
	<li>nasty pointers arithmetics</li>
	<li>call functions inside functions inside functions.. in a way to shrink 10 lines into one</li>
</ul>
I'm not saying to ship this ugly code as final, but to practice. Stuff you can understand and that other people won't, or at least have a hard time figuring it out. Suddenly you'll find yourself able to shrink codes to a point its legibility is still unaffected, but mostly important, you'll learn many different ways of doing the same thing, thus, evolving.

And remember: There is more than one way to do it! <a target="_blank" href="http://en.wikipedia.org/wiki/There's_more_than_one_way_to_do_it">TIMTOWTDI</a>
