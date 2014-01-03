---
layout: post
title: Change all file extensions in a folder
categories:
- UNIX
- sed
---
Updating all files extensions inside a folder is something that always bothered me, because it looks like something that **ought** to be automatic.

I always ended up with a dumb solution, like copying the output from _ls_ and editing everything with an editor to end up with all the commands and pasting it back. It works, but nothing to be proud of.

I came up with a different solution now after reading about _sed_. Sure it can be improved, that last _pipe_ doesn't seem to belong there, anyways, the following script did the trick.

{% highlight bash %}
ls -l | sed -n 's/.*\ \(.*\)\.oldext$/mv \1.oldext \1.newext/p' | sh
{% endhighlight %}

This script will list all the files inside the current folder, match the files that have the old extension "oldext", and generate the command to update it "mv filename.oldext filename.newext" and finally pass it to the shell to be executed.

Let me know if it works for you, or how it can be improved, or another way easier method to do that. Anything, we have comments now :D
