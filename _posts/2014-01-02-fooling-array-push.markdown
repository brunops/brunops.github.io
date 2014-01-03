---
layout: post
title: Fooling Array push
categories:
- JavaScript
---
JavaScript has no real arrays, they are actually objects with special abilities. Which means you can actually store key valued pairs inside it, just as in any other object, it'll be treated as a property, it's there, altough you won't be able to see it when logging it.

{% highlight JavaScript %}
var a = [];
a[0] = 0; // [0]
a[1] = 1; // [0, 1]
a[2] = 2; // [0, 1, 2] you get the idea..

a.hey = 123;
console.log(a);        // [0, 1, 2]
console.log(a.length); // 3 - only the elements of the collection are counted

console.log(a.hey);    // 123 yup, it's there
{% endhighlight %}

Nothing really surprising, just a property of an object. Another way to add elements to an array, is to use the _.push_ method, which takes an element and appends it to the end of the array.

{% highlight javascript %}
var a = [];
a.push(0); // [0]
a.push(1); // [0, 1]
a.push(2); // [0, 1, 2]

console.log(a.length); // 3 - same thing here..
{% endhighlight %}

Both methods are going to increase the special _.length_ property of the array, which stores how many elements there are in the collection.

So arrays are objects. Would it be possible to use Array methods onto normal objects? Yes, sir. The really common example is, the magical _arguments_ variable that is silently passed in all function calls:

###the arguments variable
{% highlight javascript %}
function myFunction(arg1, arg2) {
  console.log("arg1 === arguments[0]? ", arg1 === arguments[0]);
  console.log("arg2 === arguments[1]? ", arg2 === arguments[1]);
  console.log("arguments passed: ", arguments.length);
}

myFunction(1, 2, 3);
// arg1 === arguments[0]?  true
// arg2 === arguments[1]?  true
// arguments passed:  3
{% endhighlight %}

It looks like an array, it kinda works like an array, but it's really only a array-like object. Array methods won't work on it. _The following code won't work_

{% highlight javascript %}
function myFunction(arg1, arg2) {
  console.log(arguments.pop());
}

myFunction(1, 2, 3);
// TypeError: Object #<Object> has no method 'pop'
{% endhighlight %}

"_But I want to use arguments as an Array!_". Okay, it's JavaScript, let's make the duck quack.

First of all, Array methods are defined in it's prototype, I won't get into details about it here, as it is a long topic, but in case you don't know, think of it as a shared property where all Array objects have their methods defined.

So, a quick example
{% highlight javascript %}
var a = [];

console.log(a.pop === Array.prototype.pop);     // true
console.log(a.push === Array.prototype.push);   // true
console.log(a.slice === Array.prototype.slice); // true
{% endhighlight %}

Believe me, they are all there. What happens is, when a method is called in an Array, it's _context_, in other words, the _this_ keyword inside the function is set as the _object instance_, the _var a_ in the examples.

"_So they are the same function, can we call the Array.prototype.push directly?_". Yes, but don't. Bad things will happen.

{% highlight javascript %}
Array.prototype.push(123); // bad bad code, don't do that!
{% endhighlight %}

Calling the _.push_ method directly will set the context as the object itself, the _Array.prototype_ object to be exact. So it'll be adding elements to the prototype of the Array, don't do that, it's not cool, bro.

"_Okay, how is this useful, then?_" Let's quickly talk about _.call_ and _.apply_.

###the famous _.call_ and _.apply_
These are methods that are defined inside the _Function_ prototype object. Yep, <a href="http://en.wikipedia.org/wiki/First-class_citizen" target="_blank">functions are first-class citizens</a>. The cool thing about them, is that they allow the definition of the context in which the function is being called, in other words, it's possible to define the value of **this**.

The difference between _.call_ and _.apply_ is the type of their arguments. The first one is the context for both, all others are the arguments that are going to be passed to the function itself. And the difference is that _.call_ receives a list of arguments, and _.apply_ receives an array of arguments. Fear not! See the example:

{% highlight javascript %}
var obj = {
  total: 0,

  // takes any number of arguments
  sum: function() {
    for (var i = 0; i < arguments.length; ++i) {
      this.total += arguments[i];
    }

    console.log(this.total);
  }
};

obj.sum(1, 2, 3); // obj.total === 6
obj.sum(1, 2, 3); // obj.total === 12

obj.sum.call({ total: 0 }, 5, 10, 15);      // outputs "30"
obj.sum.apply({ total: 50 }, [5, 5, 5, 5]); // outputs "70"

obj.total; // still 12
{% endhighlight %}

How to remember which is which? "Array" ends up with "y", so is "apply". So there you go, works for me. Anyway, there's always the MDN website for <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call" target="_blank">.call</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply" target="_blank">.apply</a>.

Going back to the _arguments_ as an Array issue, the usual way to solve this is to call the _.slice_ method from the Array prototype, which duplicates the result, leaving the original object intact. It is possible to directly call the Array method passing the _arguments_ as its context too.

{% highlight javascript %}
function fn() {
  // duplicate arguments collection into a new Array
  var argumentsAsArray = Array.prototype.slice.call(arguments);
  console.log(argumentsAsArray.pop());

  // calling Array.pop with arguments as its context
  // actually modifies the arguments object
  console.log(Array.prototype.pop.call(arguments));
  console.log(Array.prototype.pop.call(arguments));
}

fn(1, 2, 3); // 3, 3 and 2
{% endhighlight %}

After this theory, let's talk about what this article is about..

###fooling the Array _.push_ method

So we learned about Arrays methods and how to call them on different objects. But how do they actually work? What does the methods take into consideration? Let's fool _.push_.

{% highlight javascript %}
var obj = {};

console.log(obj); // Object {}
Array.prototype.push.call(obj, 5);
Array.prototype.push.call(obj, 10);
console.log(obj); // Object {0: 5, 1: 10, length: 2}
{% endhighlight %}

It's possible to check that:

- _obj_ is still an Object, but not an Array
- the _.length_ property was added to _obj_
- a key valued pair is added each time, where the key is the current _.length_ of the object when the method was called

So what happens if we manipulate the values?

{% highlight javascript %}
var obj = {
  0: 10,
  1: 20
};

console.log(obj); // Object {0: 10, 1: 20}
Array.prototype.push.call(obj, 30);
console.log(obj); // Object {0: 30, 1: 20, length: 1}
Array.prototype.push.call(obj, 40);
console.log(obj); // Object {0: 30, 1: 40, length: 2}

obj.length = 5;
Array.prototype.push.call(obj, 50);
console.log(obj); // Object {0: 30, 1: 40, 5: 50, length: 6}
{% endhighlight %}

We can see that the _.length_ property is taken into consideration and the previous values end up being overwritten because they happen to have the same key. With these tests, it's possible to especulate that the code for _.push_ method is something like

{% highlight javascript %}
Array.prototype.push = function() {
  this.length = this.length || 0;
  for (var i = 0; i < arguments.length; i++) {
    this[this.length++] = arguments[i];
  }

  return this.length;
}
{% endhighlight %}

I bet there are many cases not being covered in the implementation, but that's the bigger picture. A new property is created were the key is the value of _.length_ and the value is the argument itself, and _.length_ is incremented.

Why would somebody use that? I don't know. It's not quite foolling the _.push_ method, **that's more like fooling ourselves**. But it's just cool to realize how stuff works and how you can use methods from other objects. The dolphin eventually appears when we know this stuff.




