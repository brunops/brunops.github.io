---
title: JavaScript - Rewriting the new operator
layout: post
categories:
- JavaScript
- Monkey Patching
---
Implementing something is the best way to really understand it. And this post will show how it's possible to emulate the `new` JavaScript operator. Developing a language functionality using itself is a nice way to see how flexible it is.

<blockquote>
<p>Everything is vague to a degree you do not realize till you have tried to make it precise.</p>
<p>-- Bertrand russell</p>
</blockquote>

First of all, let's define a simple constructor function to play with.

{% highlight javascript %}
function Person() {}
{% endhighlight %}

Can't get simpler than that.

Second, let's define our `newNew` interface. It's not possible to define an operator, so a function that receives a constructor function and returns a new instance of that object will do.

{% highlight javascript %}
function newNew(constructor) {
  // create a new object literal
  var obj = {};

  return obj;
}

console.log(newNew(Person) instanceof Person); // false!
{% endhighlight %}

Okay, that's a start. But the function is simply returning a new object literal, not an instance of the _constructor_ function, `Person`. Which leads to the third step. _Prototypes_.

{% highlight javascript %}
function newNew(constructor) {
  // create a new object literal
  var obj = {};

  // set object prototype as the constructor's prototype
  obj.__proto__ = constructor.prototype;

  return obj;
}

console.log(newNew(Person) instanceof Person); // true
{% endhighlight %}

The `__proto__` property exposes the Prototype of an object. The `prototype` property is exclusive to functions. It's important to say that the `__proto__` property is deprecated and should not me used in production code, ES6 provides `Object.setPrototypeOf` to mutate an object prototype, more information can be found [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto).

Prototypes are a convenient way to define types of objects. The key points are:

- Objects have an implicit property called `constructor` which is a function, and tells which constructor function the object was created from (like Array, Number, Date, or **Person** in the example)
- Functions have the `prototype` property, that is an **object** or **null**
- Objects have access to the properties of the `prototype` of its `constructor`
- The `constructor` property of an object cannot be changed
- The `__proto__` property exposes the object's prototype

This is indeed confusing, and further reading about prototypes is advised.

With this in mind, let's move forward. The new line defines the new object's type, and the test `newNew(Person) instanceof Person` will be now `true`. But there's still one thing missing, what if the constructor function takes arguments for its initialization?

{% highlight javascript %}
function Person(firstName, lastName) {
  this.firstName = firstName || "Carl";
  this.lastName  = lastName  || "Sagan";
}

// First and Last name property set properly in "person" object
var person = new Person("Derp");
console.log(person.firstName === "Derp");  // true
console.log(person.lastName  === "Sagan"); // true

// Fail!
// Properties are undefined - they were not even set
var person2 = newNew(Person, "Derp");
console.log(person2.firstName === "Derp");  // false
console.log(person2.lastName  === "Sagan"); // false
{% endhighlight %}

In this case, our `newNew` function can't handle the arguments. Fortunately, that's an one liner easy fix. And here is the full final code.

{% highlight javascript %}
function Person(firstName, lastName) {
  this.firstName = firstName || "Carl";
  this.lastName  = lastName  || "Sagan";
}

function newNew(constructor) {
  // create a new object literal
  var obj = {};

  // set object prototype as the constructor's prototype
  obj.__proto__ = constructor.prototype;

  // call constructor function with obj as it's context
  // together with all arguments
  constructor.apply(obj, Array.prototype.slice.call(arguments, 1));

  return obj;
}

// Properties set Properly
var person2 = newNew(Person, "Derp");
console.log(person2.firstName === "Derp");  // true
console.log(person2.lastName  === "Sagan"); // true
{% endhighlight %}

The last added line takes care of calling the constructor function with it's context (the `this` value) set to the new object using `.apply`. The long `.slice(1)` call gets all arguments but the constructor itself and return them as an array.

And finally the `newNew` works as expected!







