---
layout: default
title: exports vs. module.exports
categories:
- node.js
- javascript
---
I usually understand the difference between both but after a while I simply forget, so I'm writing it to try to make it stick or for future review. Better yet, to help you, my friend.

If you use node.js, you have encountered modules using both `module.exports` and `exports`. What is the difference between them?

Simply put, what is going to be exported is the `module.exports` object. That's it. The `exports` variable is just a reference to that object, and this causes a couple of small differences. Let's dig a little deeper. Starting with an example with the exact same results, and then showing the difference explicitly.

#### Example 1: `module.exports`
{% highlight javascript %}
module.exports.hey = function () {
  console.log('hey');
};

module.exports.ho = function () {
  console.log('ho');
};
{% endhighlight %}

#### Example 1: `exports`
{% highlight javascript %}
exports.hey = function () {
  console.log('hey');
};

exports.ho = function () {
  console.log('ho');
};
{% endhighlight %}

#### Example 1: Usage
{% highlight javascript %}
// it will import from module.js file (must be in the same directory)
var obj = require('./module');

obj.hey(); // prints "hey"
obj.ho();  // prints "ho"
{% endhighlight %}

This will work just fine, it'll export the same object, and both will give you the exact same result, the same object was changed, no secrets here. Let's see the actual difference now.

#### Example 2: `module.exports`
{% highlight javascript %}
module.exports = function () {
  console.log('let\'s go!');
};
{% endhighlight %}

#### Example 2: `exports`
{% highlight javascript %}
exports = function () {
  console.log('let\'s go!');
};
{% endhighlight %}

#### Example: Usage
{% highlight javascript %}
// importing previous code from file named module.js (must be in the same directory)
require('./module')(); // prints "let's go!"
{% endhighlight %}

In this second example, the code is only going to work with the `module.exports` pattern

And this is it. No secret. As said before, the exported object is `module.exports` and `exports` is simply a reference to it. If you add properties to it, either through `module.exports` or simply `exports`, you'll be changing the exact same object, so you'll get the same results. On the other hand, if you change what's inside `module.exports` you'll get the new value as well, but if you reset `exports` and reference a different object, nothing is going to be exported because `module.exports` will be still empty and that is what really matters.

