---
layout: post
title: Modularity hides your shit
categories:
- rant
- modularity
---
Everybody writes shitty code. That's how we learn. Even that person that you think is awesome writes very bad code, and that doesn't make them less awesome.

That's just the nature of software development. We're always learning with the systems that we're developing. No software is exactly the same as the previous one. Heck, that's the exact reason why it is being developed in the first place.

I'm not saying good software doesn't exist. It does. But it's very rare. And it is not evaluated by how many factories, interfaces, visitors, *your favorite design pattern here* are being used. Quality is defined by how many people think your code solves their problem, by how many people enjoy using your code.

That's why single purpose modules are good. They hide your shitty code. Spend your time designing simple stateless modules with very clear interfaces and you can write as much shit as you want. TDD helps a ton here.

You'll still have to write Monoliths. And Monoliths will be bad. Just accept it. They start as a blank canvas where you can have a ton of fun designing. They're there just waiting for you to try the latest amazing software development practice that you can't imagine how everyone else doesn't know (which in reality you just learned last week). They're not half as fun to maintain.

Good programmers go the extra mile. They notice patterns, sometimes completely unrelated to the Monolith and create a module to solve a specific problem. Write a stateless module with a very simple and clear interface that solves a problem and people will use it. Developers don't care about *your* edge cases, they care about *their own* edge cases. Good modules solve my current problem and allow me to move on. Great modules hide their shit so I don't have to deal with it ever again. They just work, no more, no less.

After developing this great new module you can use it in your Monolith and publish it for the community to use. And that's the true test. People will adopt the module if it solves their problem with no headache. Otherwise it'll just die a quiet death and that's totally fine. It's Software natural selection at it's finest.

The option to that is that no module is created and all of yesterday's module code will be today's Monolith technical debt. And trust me, Monoliths do not need more technical debt.

Most people don't care. They just want to solve the current business problem and move on. Understanding everything is hard, refactoring is hard, refactoring without tests is even harder. So they'll do everything to work around abstract interfaces and solve one problem, not rethink the entire problem space and implement a more solid design. Because why should they?

That's the reason why it's so common for a workaround written "just to go live and later you fix it" to become an intrisic part of your Monolith. A part that if "fixed", breaks other parts of the system. A piece of code that three years after you're in a different project is still there, and you just hope that someone committed some wrong stuff and now `git blame` shows a different user.

Code that is encapsulated inside a module is much more reliable. And quality and reliability can be fully proven with tests. Once you have that, *it doesn't matter how shitty the implementation really is*, the shit is encapsulated so we don't have to deal with that. Of course, you may have to "optimize" your module with even more unreadable code, but that doesn't really matter. It doesn't matter if the encapsulated shit is shittier, as long as the shittier shit is still encapsulated. And as a bonus, you are totally free to express your artistic side with how you use your semicolons and your commas.

You'll find people "designing stardards" that can be "just copied" *when solving the problem for the first fucking time* way too often. You see, programmers don't want to think about your incapabilities of designing a system, they are too busy dealing with their own incapabilities of designing a system. Stop pushing your shitty code on me, I already have more than enough. Push it somewhere else, as a module, and if it works I might consider using it.
