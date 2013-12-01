---
layout: post
title: Day 8 - Dev Bootcamp
date: '2013-09-03T01:25:00-07:00'
tags: 
tumblr_url: http://brunopsanches.tumblr.com/post/60154780245/day-8-dev-bootcamp
---
<p>Not so much philosophical today, so here&#8217;s something useful.</p>
<p>In Ruby, arguments are passed by reference, and using obj.clone / obj.dup may cause major headaches trying to figure out why your duplicated nested array is being changed while it shouldn&#8217;t.</p>
<pre class="prettyprint"><code>a = [["my elements are"], ["here"]]
b = a.dup

p a # =&gt; [["my elements are"], ["here"]]
p b # =&gt; [["my elements are"], ["here"]]

b[1][0] = "not here"

# where did my elements go?
p a # =&gt; [["my elements are"], ["not here"]]
p b # =&gt; [["my elements are"], ["not here"]]</code></pre>
<p>Why isn&#8217;t it duplicated? It actually is, the first array is duplicated, but the nested elements are still references. A way to force everything to be duplicated for sure is to use <a class="vt-p" href="http://www.ruby-doc.org/core-1.9.3/Marshal.html">Marshal</a> library.</p>
<pre class="prettyprint"><code>a = [["my elements are"], ["here"]]
b = Marshal.load(Marshal.dump(a))

p a # =&gt; [["my elements are"], ["here"]]
p b # =&gt; [["my elements are"], ["here"]]

b[1][0] = "not here"

# Look! They're here!
p a # =&gt; [["my elements are"], ["here"]]
p b # =&gt; [["my elements are"], ["not here"]]</code></pre>
