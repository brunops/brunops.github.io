---
layout: post
title: All cowsay cows
categories:
- bash
- CLI
- Linux
- shell
---
I was having fun with the cowsay (yeah, for me this is fun) combined with fortune to give a nice touch to <a title="See the resulting .bashrc" href="/my-cool-bashrc-file/" target="_blank">my bash</a>. Suddenly I discovered that there are many available cows :O ("cowsay -l") , so I started seeing them all. It was kind of repetitive job to print each one of then (20 in total), so I combined cowsay with awk to write a command to print 'em all, yay.

{% highlight bash %}
# This will print all cows in the console
# You can escape it to a file by adding "> file.txt" at the end
cowsay -l | awk '/^[^Cow]/ { for (i = 1; i < 20; i++) { if ($i) { system("cowsay -f"$i" "$i); } } }'
{% endhighlight %}

Each cow will be saying its own name. Enjoy :)

EDIT:
And here is an updated version that doesn't rely on a `for` loop (and also no `parallel`, which is probably even nicer, but wanted to do without it ¯\\\_(ツ)\_/¯)

{% highlight bash %}
cowsay -l | tr ' ' \\n | tail -n+5 | xargs -n1 -I@ sh -c 'cowsay -f@ @'
{% endhighlight %}

