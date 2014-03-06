---
layout: post
title: Day 8 - Dev Bootcamp
date: '2013-09-03T01:25:00-07:00'
categories:
- Ruby
- Marshal
---
Not so much philosophical today, so here's something useful.

In Ruby, arguments are passed by reference, and using obj.clone / obj.dup may cause major headaches trying to figure out why your duplicated nested array is being changed while it shouldn't.

{% highlight ruby %}
a = [["my elements are"], ["here"]]
b = a.dup

p a # => [["my elements are"], ["here"]]
p b # => [["my elements are"], ["here"]]

b[1][0] = "not here"

# where did my elements go?
p a # => [["my elements are"], ["not here"]]
p b # => [["my elements are"], ["not here"]]
{% endhighlight %}

Why isn't it duplicated? It actually is, the first array is duplicated, but the nested elements are still references. A way to force everything to be duplicated for sure is to use <a target="_blank" href="http://www.ruby-doc.org/core-1.9.3/Marshal.html">Marshal</a> library.

{% highlight ruby %}
a = [["my elements are"], ["here"]]
b = Marshal.load(Marshal.dump(a))

p a # => [["my elements are"], ["here"]]
p b # => [["my elements are"], ["here"]]

b[1][0] = "not here"

# Look! They're here!
p a # => [["my elements are"], ["here"]]
p b # => [["my elements are"], ["not here"]]
{% endhighlight %}
