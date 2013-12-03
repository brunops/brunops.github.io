---
layout: post
title: Ajax calls with pure JavaScript
date: '2013-09-24T22:30:53-07:00'
---
<span>You can get the correct object according to the browser with:</span>

{% highlight javascript %}
function getXmlDoc() {
  var xmlDoc;

  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlDoc = new XMLHttpRequest();
  }
  else {
    // code for IE6, IE5
    xmlDoc = new ActiveXObject("Microsoft.XMLHTTP");
  }

  return xmlDoc;
}
{% endhighlight %}

<span>With the correct object, a GET might can be abstracted to:</span>
{% highlight javascript %}
function myGet(url, callback) {
  var xmlDoc = getXmlDoc();

  xmlDoc.open('GET', url, true);

  xmlDoc.onreadystatechange = function() {
    if (xmlDoc.readyState === 4 && xmlDoc.status === 200) {
      callback(xmlDoc);
    }
  }

  xmlDoc.send();
}
{% endhighlight %}

<span>and a POST to:</span>
{% highlight javascript %}

function myPost(url, data, callback) {
  var xmlDoc = getXmlDoc();

  xmlDoc.open('POST', url, true);
  xmlDoc.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xmlDoc.onreadystatechange = function() {
    if (xmlDoc.readyState === 4 && xmlDoc.status === 200) {
      callback(xmlDoc);
    }
  }

  xmlDoc.send(data);
}
{% endhighlight %}
