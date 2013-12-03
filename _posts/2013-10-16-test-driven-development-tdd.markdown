---
layout: post
title: Test Driven Development (TDD)
date: '2013-10-16T22:20:22-07:00'
---
I never thought I was going to say it, but it's true, <strong>tests are beautiful</strong>. Last group projects went differently.

First project was focused on <a target="_blank" href="http://www.sinatrarb.com/">Sinatra</a> and pure JavaScript and we used a lot of <a target="_blank" href="http://pivotal.github.io/jasmine/">Jasmine</a> to create tests while developing, which created a really reliable app, and something that I'm proud of. But because of the struggle with all the tests, it ended up not being finished, which is little frustrating.

Second project we had a really good group, a good idea and everyone was motivated to develop the app. There were lots of technologies we wanted to use, like <a target="_blank" href="http://jquery.com/">jQuery</a>, <a target="_blank" href="http://www.heroku.com/">Heroku</a>, Postgres, Workers, OAuth, Twitter API, SunLight API, and, of course, we wanted to deliver. What happened? Tests were neglected. By the end of the week we had a monster MVP which could be used but that was not reliable. Want to add something? Glue code! You basically don't know what you are doing and if something breaks you'll just discover it later, how to fix it? More glue code, then cross your fingers and hope for the best :)

On this last project, stuff kinda worked, it was cool, learned a lot of concepts and was delivered. But looking back, I have no doubt that I'm more proud of the first project, which was not finished but was developed with <a target="_blank" href="http://en.wikipedia.org/wiki/Test-driven_development">TDD</a>. Not to mention that it gives me chills to think about keep working on it, not reliable.

<strong>Benefits of TDD so far:</strong>
<ul>
  <li>Reliable software</li>
  <li>Well structured code (code that is easy to test is easy to understand)</li>
  <li>Can handle refactoring any time</li>
  <li>Security that your code does just what it is supposed to, and correctly</li>
</ul>
<strong>Downside:</strong>
<ul>
  <li>Moving slower on the beginning of the project</li>
  <li>Steep learning curve</li>
</ul>

After the last project, I'm not working without TDD anymore. Tests take a long time to be defined, and it's really hard to think critically about your code before starting to type. Really hard to <em>write tests for the code you wish you had</em>. So it's easy to just say it's not worth it and skip testing. The hard part is to struggle, stand up and accept the challenge.

The good news is, like anything else, you'll get better with time, having experience with tests is an invaluable skill.
