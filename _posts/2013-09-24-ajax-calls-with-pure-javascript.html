---
layout: post
title: Ajax calls with pure JavaScript
date: '2013-09-24T22:30:53-07:00'
tags: 
tumblr_url: http://brunopsanches.tumblr.com/post/62209353156/ajax-calls-with-pure-javascript
---
<p><span>You can get the correct object according to the browser with</span></p>
<pre class="prettyprint"><code>function getXmlDoc() {
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
</code></pre>
<p><span>With the correct object, a GET might can be abstracted to:</span></p>
<pre class="prettyprint"><code>
function myGet(url, callback) {
  var xmlDoc = getXmlDoc();

  xmlDoc.open('GET', url, true);

  xmlDoc.onreadystatechange = function() {
    if (xmlDoc.readyState === 4 &amp;&amp; xmlDoc.status === 200) {
      callback(xmlDoc);
    }
  }

  xmlDoc.send();
}
</code></pre>
<p>and a POST to:</p>
<pre class="prettyprint"><code>
function myPost(url, data, callback) {
  var xmlDoc = getXmlDoc();

  xmlDoc.open('POST', url, true);
  xmlDoc.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xmlDoc.onreadystatechange = function() {
    if (xmlDoc.readyState === 4 &amp;&amp; xmlDoc.status === 200) {
      callback(xmlDoc);
    }
  }

  xmlDoc.send(data);
}
</code></pre>
