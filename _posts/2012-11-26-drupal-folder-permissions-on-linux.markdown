---
layout: post
title: Drupal folder permissions on Linux
categories:
- CLI
- Drupal
- Gist
- Linux
---
Every time after starting a new fresh install of Drupal in my Linux box I always have to set some permissions to the hierarchy structure to make it work properly.

As I always need to hunt the commands over again, I've decided to put everything in one place so I can easily remember.
{% highlight bash %}
# Include your user in www-data group
# This command needs to be run only once
# If your user already exists you may instead need use
# sudo usermod -a -G www-data brunops
useradd -G www-data brunops

# File User/Group owners
sudo chown -R brunops:www-data /path/to/folder --preserve-root

# Drupal file permissions
# Execution perm for files
sudo find /path/to/folder -type f -print0 | xargs -0 sudo chmod 644 --preserve-root

# Execution perm for folders
sudo find /path/to/folder -type d -print0 | xargs -0 sudo chmod 755 --preserve-root
{% endhighlight %}

Latest version of the code can be checked in my <a title="Latest version" href="https://gist.github.com/4148926" target="_blank">Gist</a>.
