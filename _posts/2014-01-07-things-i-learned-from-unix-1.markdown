---
layout: post
title: Things I learned from UNIX 1 - sed
categories:
- UNIX
- CLI
- sed
- regex
---
'Sed' stands for _**s**tream **ed**itor_. Think of it as a program that edits a text file on a per line basis.

### 1. The 's' stands for 'substitute'
You'll probably see the following pattern very frequently.
{% highlight bash %}
sed 's/pattern1/pattern2/' filename
{% endhighlight %}
It basically means you're matching `pattern1` and substituting for `pattern2`.

### 2. The `&` operator is the full match
Everything that was matched in `pattern1` can be referenced in `pattern2` with the `&` character. No need to enclose the whole regex in parenthesis.
{% highlight bash %}
sed 's/.*/& bacon/' filename
{% endhighlight %}
Append "bacon" to every line, because everything gets better with bacon.

### 3. The matching is greedy and there's no _+_ modifier
When a simple matching pattern like `[a-z]*`, that matches a sequence of zero or more characters from a to z is used, it may not behave exactly the way you'd expect. In "abc 123" it would match "abc", but in "123 abc" it would match "", an empty string. Because the matching is greedy and it's going to try to find the biggest match as soon as possible.

In the GNU version of sed, it is possible to use the `-r` option to enable the extended regular expressions and change it to `[a-z]+`, that matches a sequence of one or more characters from a to z.

Sadly, there's no regex `+` operator in the original sed implementation, and that's the built in version in Mac OS X, BOOO.

A workaround this issue in the original implementation, would be to force the matching of at least one character by changing the regex to `[a-z][a-z]*`

### 4. Escape ALL the parenthesis `(`
Parenthesis create matching groups. When creating a group in your matching pattern, the parenthesis must be escaped.
{% highlight bash %}
sed 's/\(group1\)/sup \1/' filename
{% endhighlight %}
I don't fully understand why, but it won't work otherwise.

### 5. Any character may be used as a delimiter
The backslash is probably the most common delimiter used, just like a regex in JavaScript. But it's not mandatory, any character may be used as a delimiter.

It can be useful when matching system paths. By changing the delimiter, from say `/` to `:`, there's no need to escape all the backslashes, so

{% highlight bash %}
sed 's/\/Users\/brunops\/projects/~\/projects/' filename
{% endhighlight %}
can become:
{% highlight bash %}
sed 's:/Users/brunops/projects:~/projects:' filename
{% endhighlight %}

### 6. More than one expression can be on the same command
Have you ever wondered what that `-e` option is? It stands for _expression_, and besides being optional when you have only one pattern, it can be useful when you have multiple. Let's see an example:

Imagine a script that capitalizes all vogals. To do that you could pipe sed commands together like:
{% highlight bash %}
cat filename | sed 's/a/A/g' | sed 's/e/E/g' | sed 's/i/I/g' | sed 's/o/O/g' | sed 's/u/U/g'
{% endhighlight %}

And it will work just fine. By the way, the `g` flag modifier at the end stands for _global_, and means that all matches are going to be processed, only the first occurence in each line is matched by default.

Okay, but that code will trigger five processes, one per command, what you can do to achieve the same results while using only one sed process is to use the `-e` option, and the code will give the exact same results, the command would be:
{% highlight bash %}
sed -e 's/a/A/g' -e 's/e/E/g' -e 's/i/I/g' -e 's/o/O/g' -e 's/u/U/g' filename
{% endhighlight %}

### 7. The lonely comma is the content between two patterns
You can print the content between to line matches with _sed_ using:
{% highlight bash %}
sed -n '/pattern1/,/pattern2/p' filename
{% endhighlight %}
The `-n` means "silent mode", and prevents _sed_ from outputting to _stdout_, but the `p` flag at the end instructs _sed_ to print the lines that matched the command, result: the output is only the contents delimited by the patterns (including the pattern delimiters).

### Last. This guide will answer all your questions much better than this post
[Sed - An Introduction and Tutorial by Bruce Barnett](http://www.grymoire.com/Unix/Sed.html)




