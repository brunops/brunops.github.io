---
title: JavaScript - Implementing the new operator
layout: post
categories:
- JavaScript
- Monkey Patching
---
Implementing something is the best way to really understand something. And this post will show how it's possible to emulate the _new_ JavaScript operator. Developing a language functionality using itself is a nice way to see how flexible it is.

<blockquote>
'Everything is vague to a degree you do not realize till you have tried to make it precise.' - Bertrand russell
</blockquote>

First of all, let's define a simple constructor function to play with.

{% highlight javascript %}
function Person() {}
{% endhighlight %}

Can't get simpler than that.

Second, let's define our _newNew_ interface. It's not possible to define an operator, so let's start with a function that receives a constructor function and returns a new instance of that object.

{% highlight javascript %}
function newNew(constructor) {
  var obj = {};   // create a new object literal

  return obj;     // return new object
}

console.log(newNew(Person) instanceof Person); // false!
{% endhighlight %}

Okay, that's a start. But the function is simply returning a new object literal, not an instance of the _constructor_ function, _Person_. Which leads to the third step. _Prototypes_.

{% highlight javascript %}
function newNew(constructor) {
  var obj = {};   // create a new object literal

  obj.__proto__ = constructor.prototype;

  return obj;     // return new object
}

console.log(newNew(Person) instanceof Person); // false!
{% endhighlight %}
