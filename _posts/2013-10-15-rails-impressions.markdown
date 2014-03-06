---
layout: post
title: Rails Impressions
date: '2013-10-15T01:59:00-07:00'
---
I started writing this a week ago.. so try to abstract when time is mentioned..

Second day with Rails, things are starting to make sense, TDD is beginning to be fun, but.. Rails knows too much. I finally understand what people want to say when they talk about the Rails 'magic'.

I'm trying to convince myself that this is a good thing, and that convention over configuration is the way to go, that I'm confused because everything is new, but eventually things will make sense and I'll be glad to have struggled with it.

Right now, I think Rails knows too much. Let me explain, we were split into groups and we have decided to do everything with TDD.

Everything was going well while creating all my tests inside the `/spec` folder. All models, controllers and integrations tests..

After realizing that they were in the wrong place, I just thought "<em>cool, so now I just create a quick branch to reorganize my tests into its folders, send a pull request and keep going, gimme 20 minutes</em>". So naive..

So I created the `models`, `controllers` and `integrations` folders, moved some files around and just ran the tests before committing to make sure everything was working when suddenly.. tests stopped working. So cool.

A lot of "<em>if the file is in `/spec` it works, if the exact same file is in `/models`, it doesn't</em>", a couple of "<em>if the name of the folder is changed the tests work, if it's `models` it doesn't, and I just created this folder!</em>".

So, long frustration story short, Rails and <a target="_blank" href="https://relishapp.com/rspec/rspec-rails/v/2-14/docs">RSpec</a> have special naming conventions and expect some exact folder structure to work properly. It actually provides different classes for testing, according to what you are testing. So things that you use for testing controllers might not work when testing models.

Don't get me wrong, I agree that the convention is a good thing, and after reading the RSpec documentation, it made sense and I agree with it. The only thing that bothers me is the fact that special folder names <strong>that were not created by default</strong> have specific behaviors. It just doesn't seem like good design for me. Or maybe it's just my fault, trying to actually understand how Rails work and not using scaffold code..
