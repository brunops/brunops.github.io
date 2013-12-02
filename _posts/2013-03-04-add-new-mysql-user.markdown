---
layout: post
title: Add new MySQL User
categories:
- Drupal
- MySQL
---
When working with Drupal the need to test some different configurations, testing or developing new modules occurs often times, and this is no argument to break the site for the rest of the team. So the need of create a sandbox appears.

I don't like to keep my root password inside the drupalfolder/sites/default/settings.php file, so I create a new user for my MySQL file with some dummy password.

The command I use to give the privileges to this new user are:

{% highlight bash %}
CREATE USER 'brunops'@'localhost' IDENTIFIED BY 'brunopass';
GRANT ALL PRIVILEGES ON *.* TO 'brunops'@'localhost' WITH GRANT OPTION;
{% endhighlight %}

This way I have all the right permissions to a dummy user @localhost.

More information can be found <a title="MySQL documentation" href="http://dev.mysql.com/doc/refman/5.1/en/adding-users.html" target="_blank">here</a>.
