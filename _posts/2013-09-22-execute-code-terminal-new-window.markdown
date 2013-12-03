---
layout: post
title: Execute code in new Terminal window
categories:
- bash
- CLI
- random
---
Open a new Terminal window, from the Terminal (mac os), give focus to it and run some arbitrary code:

{% highlight bash %}
osascript -e 'tell application "Terminal"
  do script "echo wazzup"' -e 'activate' -e '
end tell'
{% endhighlight %}

So this will open a new Terminal and kindly say “wazzup”, but, of course, it’s possible execute whatever you want.. have you heard about cmatrix? cowsay? sl?

I feel that I shouldn’t be teaching this..
