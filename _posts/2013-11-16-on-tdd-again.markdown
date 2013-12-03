---
layout: post
title: on TDD.. again...
date: '2013-11-16T16:44:36-08:00'
categories:
- TDD
- Jasmine
---
TDD is really awesome. If you're starting now, just keep repeating it to yourself while you think you're wasting time doing it, but <strong>keep doing it</strong>. When your project gets big enough, you won't be able to be more grateful to your test suite. Specially when features that you didn't anticipate start being added. <strong>And they will be added</strong>.

I have been watching some videos about it lately, like, <a target="_blank" href="http://startuplab.googleventures.com/test-driven-design-2013-07-09">Test-Driven Design</a> from the AngularJS team, <a target="_blank" href="http://www.youtube.com/watch?v=983zk0eqYLY">Roman Numerals Kata</a> with Jim Weirich, that although the quality of the video is not so good, the quality of the code is, and <a target="_blank" href="http://blog.testdouble.com/posts/2013-10-03-javascript-testing-tactics.html">JavaScript Testing Tactics</a> with Justin Searls, who talks about patterns, tools and strategies to write tests, specially interesting on asynchronous code testing.

I strongly believe that in order to write good tests you'll first write bad tests and like writing, talking to somebody you don't know or public speaking, the hardest part is starting. Starting boots your brain and it suddenly discovers a lot of cases that need to be tested.

Even if you have to set up a lot of things before actually testing, that already tells you something useful. Your code is probably more complex than it should be. But only by writing it that you can start to notice the patterns and improve the design. <strong>Code that is easy to test, is code that is easy to use</strong>.

The cool thing about TDD is that you have to actually think about the problem, and <strong>write tests for the code you want to have</strong>. After the code is surrounded by tests that define how the application works, and what are the interfaces, you are free to refactor the code and make it as beautiful as you can, without losing and functionality. Securing yourself from your future self that will do whatever to mess up your code. Awesome.
