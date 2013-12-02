---
layout: post
title: Intercepting jQueryUI calls
categories:
- JavaScript
- jQuery
- jQueryUI
---
Recently I had to perform some actions before opening and before closing a dialog in a website. I had multiple dialogs throughout the website, the thing in common among them, was that all dialogs used the awesome jQueryUI dialog plugin, so I could take advantage of that..

Understanding the innards of JavaScript allows us to do some cool things. Not saying they're should be done, or that they are the right thing to do, just saying you can :)

So.. prototypes...
{% highlight javascript %}
function overrideDialogBehaviors() {
  var oldOpen = $.ui.dialog.prototype.open;
  $.ui.dialog.prototype.open = function() {
    console.log('Do whatever you want before opening a dialog');
    oldOpen.call(this);
  }

  var oldClose = $.ui.dialog.prototype.close;
  $.ui.dialog.prototype.close = function(event) {
    console.log('Do whatever you want before closing a dialog');
    oldClose.call(this, event);
  }
}
{% endhighlight %}
Digging a bit into the jQueryUI source code, we can find the open and close dialog methods, they are responsible for showing and hiding the dialogs, respectively. Overriding their behavior, without losing any functionality is easy by simply setting them again, and calling the old method again, with all previous parameteres.

In order to be able to perform the interception successfully, we can use the call() method, more information about it can be found in <a target="_blank" href="https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/call">Mozillas JavaScript Reference</a>.

The idea is simple, store the old <strong>open</strong> and <strong>close</strong> methods in a variable, redefine the dialog methods, do whatever we want to and call the old method again, using the stored methods, with the same parameters and scope, keeping all functionality.
