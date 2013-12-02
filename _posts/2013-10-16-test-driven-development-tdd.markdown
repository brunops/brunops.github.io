---
layout: post
title: Test Driven Development (TDD)
date: '2013-10-16T22:20:22-07:00'
tags: 
tumblr_url: http://brunopsanches.tumblr.com/post/64262963573/test-driven-development-tdd
---
<p>I never thought I was going to say it, but it&#8217;s true, <strong>tests are beautiful</strong>. Last group projects went differently.</p>
<p>First project was focused on <a href="http://www.sinatrarb.com/">Sinatra</a> and pure JavaScript and we used a lot of <a href="http://pivotal.github.io/jasmine/">Jasmine</a> to create tests while developing, which created a really reliable app, and something that I&#8217;m proud of. But because of the struggle with all the tests, it ended up not being finished, which is little frustrating.</p>
<p>Second project we had a really good group, a good idea and everyone was motivated to develop the app. There were lots of technologies we wanted to use, like <a href="http://jquery.com/">jQuery</a>, <a href="http://www.heroku.com/">Heroku</a>, Postgres, Workers, OAuth, Twitter API, SunLight API, and, of course, we wanted to deliver. What happened? Tests were neglected. By the end of the week we had a monster MVP which could be used but that was not reliable. Want to add something? Glue code! You basically don&#8217;t know what you are doing and if something breaks you&#8217;ll just discover it later, how to fix it? More glue code, then cross your fingers and hope for the best :)</p>
<p>On this last project, stuff kinda worked, it was cool, learned a lot of concepts and was delivered. But looking back, I have no doubt that I&#8217;m more proud of the first project, which was not finished but was developed with <a href="http://en.wikipedia.org/wiki/Test-driven_development">TDD</a>. Not to mention that it gives me chills to think about keep working on it, not reliable.</p>
<p><strong>Benefits of TDD so far:</strong></p>
<ul><li>Reliable software</li>
<li>Well structured code (code that is easy to test is easy to understand)</li>
<li>Can handle refactoring any time</li>
<li>Security that your code does just what it is supposed to, and correctly</li>
</ul><p><strong>Downside:</strong></p>
<ul><li>Moving slower on the beginning of the project</li>
<li>Steep learning curve</li>
</ul><p>After the last project, I&#8217;m not working without TDD anymore. Tests take a long time to be defined, and it&#8217;s really hard to think critically about your code before starting to type. Really hard to <em>write tests for the code you wish you had</em>. So it&#8217;s easy to just say it&#8217;s not worth it and skip testing. The hard part is to struggle, stand up and accept the challenge.</p>
<p>The good news is, like anything else, you&#8217;ll get better with time, having experience with tests is an invaluable skill.</p>
