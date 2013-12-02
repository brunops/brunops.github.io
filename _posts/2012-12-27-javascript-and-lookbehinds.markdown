---
layout: post
title: JavaScript and Lookbehinds
categories:
- JavaScript
- jQuery
- regex
- Tests
tags: []
status: publish
type: post
published: true
meta:
  _edit_last: '1'
---
I've been poking around with some redirects that I needed to perform with RewriteRules in Apache configuration. This story deserves its own post, and I hope to post it soon. So, long story short, I had to deal with some complex regular expressions (regexes). The regex started simple, but soon grew bigger when covering other scenarios and trying to keep it in only one expression.

I basically had a couple scenarios that I wanted my regex to match (or not), and needed to keep testing it, as any minor change could compromise the whole test suite. "That's simple", I thought, "I'll create a super JavaScript code that will perform all my tests at once". It started pretty well, I had to figure out how Apache treats urls and deal with the RewriteConds, but not a major problem. And after that I was able to simulate its behavior and check the results on a &lt;irony&gt;nice, extremely awesome, super stylized HTML table&lt;/irony&gt;, really great, right?

Basic HTML for the tests:
<pre class="brush: html; gutter: true; first-line: 1">&lt;!doctype html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;meta charset="utf-8"&gt;
    &lt;title&gt;Test Cases&lt;/title&gt;
    &lt;script src="http://bit.ly/jqsource"&gt;&lt;/script&gt;
    &lt;style type="text/css"&gt;
      tr.pass {
        background: #72DA72;
      }
      tr.failed {
        background: #EB5C5C;
      }
      body {
        font-family: "Courier New";
      }
      table {
        border-collapse: collapse;
      }
      table, tr, td {
        border: 2px solid black;
      }
      tr:first-child td {
        font-weight: bold;
        background: #CCC;
      }
      td {
        padding: 5px;
      }
    &lt;/style&gt;
  &lt;/head&gt;

  &lt;body&gt;
    &lt;table id="tests"&gt;
      &lt;tr&gt;
        &lt;td&gt;#&lt;/td&gt;
        &lt;td&gt;Test Case&lt;/td&gt;
        &lt;td&gt;Should match?&lt;/td&gt;
        &lt;td&gt;Status&lt;/td&gt;
      &lt;/tr&gt;
    &lt;/table&gt;

    &lt;script src="testCasess.js"&gt;&lt;/script&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>
JavaScript to Simulate Apache RewriteConds and Perform tests:
<pre class="brush: javascript; gutter: true; first-line: 1">var testCases = [
  { text : "node",                             shouldMatch: true  },
  { text : "/node",                            shouldMatch: true  },
  { text : "/node/30",                         shouldMatch: true  },
  { text : "node/30",                          shouldMatch: true  },
  { text : "nODe/30?param=123",                shouldMatch: true  },
  { text : "el-GR/node",                       shouldMatch: true  },
  { text : "el-GR/nODe",                       shouldMatch: true  },
  { text : "/test?q=node",                     shouldMatch: true  },
  { text : "/test?paramq=node",                shouldMatch: false },
  { text : "/test?p1=1&amp;p2=2&amp;p3=c&amp;q=node&amp;p5=6", shouldMatch: true  },
  { text : "/test?q=node/add",                 shouldMatch: true  },
  { text : "/taxonomy",                        shouldMatch: false },
  { text : "/taxonomy/term",                   shouldMatch: true  },
  { text : "/taxonomy/term/10",                shouldMatch: true  },
  { text : "/test?param=taxonomy/term/10",     shouldMatch: false },
  { text : "/test?paramq=taxonomy/term/10",    shouldMatch: false },
  { text : "/test?q=taxonomy/term/10",         shouldMatch: true  },
  { text : "/en/user/login",                   shouldMatch: true  },
  { text : "/user/logout",                     shouldMatch: false },
  { text : "/test?q=user/logout",              shouldMatch: false },
  { text : "/test?q=user/logout/bla",          shouldMatch: false },
  { text : "/test?q=user/logout/bla?aa=1",     shouldMatch: false },
  { text : "/some/big/path?q=user/10",         shouldMatch: true  },
  { text : "/some/big/path?q=/user/10",        shouldMatch: true  },
  { text : "/node-something/will/not/match",   shouldMatch: false },
  { text : "/something-nOde/will/not/match",   shouldMatch: false },
  { text : "/only/NoDE/will/match",            shouldMatch: true  },
  { text : "/admin/",                          shouldMatch: true  }
];

// Anonymous auto executing function
(function($) {

  // document ready
  $(function() {
    runTests();
  });

  var requestUriRegexes = [
    /^(.*\/)?user(\/(?!logout).*)?$/im,
    /^(.*\/)?(node|admin|taxonomy\/(autocomplete|term))(\/.*)?$/im
  ];
  var queryStringRegexes = [
    /\bq=(.*\/)?user((?!\/logout).*)/im,
    /\bq=(.*\/)?(node|admin|taxonomy\/(autocomplete|term))(\/.*)?/im
  ];

  // Run tests and format result in a table
  function runTests() {
    $.each(testCases, function(i, e) {
      var test      = this,
          status    = assertText(test),
          statusMsg = status ? getPassMsg() : getFailedMsg();

      $('#tests').append(
        $('&lt;tr&gt;&lt;/tr&gt;').addClass((status ? 'pass' : 'failed')).append(
          '&lt;td&gt;' + i + '&lt;/td&gt;&lt;td&gt;' + test.text + '&lt;/td&gt;&lt;td&gt;' + test.shouldMatch + '&lt;/td&gt;&lt;td&gt;' + statusMsg + '&lt;/td&gt;'
        )
      );
    });
  }

  function getPassMsg() {
    return '&lt;span class="pass"&gt;PASS&lt;/span&gt;';
  }
  function getFailedMsg() {
    return '&lt;span class="failed"&gt;FAIL&lt;/span&gt;';
  }

  function assertText(elem) {
    var pass = false,
        requestUri  = elem.text,
        queryString = '';

    // Treat query string the same way as Apache
    var queryStringExists = requestUri.indexOf('?') != -1;

    // Define request URI and Query String
    if (queryStringExists) {
      var queryString = requestUri.substr(requestUri.indexOf('?') + 1),
          requestUri  = requestUri.substr(0, requestUri.indexOf('?'));
    }

    // Store result in "pass" variable
    $.each(requestUriRegexes, function() {
      pass |= this.test(requestUri);
    });

    // Apply same patterns on the query string
    if (queryStringExists) {
      $.each(queryStringRegexes, function() {
        pass |= this.test(queryString);
      });
    }

    // Log errors in console on fail
    if (!(pass == elem.shouldMatch)) {
      console.log('---------------[FAIL]');
      console.log(elem);
      console.log('requestUri: ' + requestUri);
      console.log('queryString: ' + queryString);
    }

    return pass == elem.shouldMatch;
  }

})(jQuery);</pre>
[caption id="attachment_54" align="alignnone" width="289"]<a class="vt-p" href="http://brunops.org/javascript-and-lookbehinds/snapshot2/" rel="attachment wp-att-54"><img class="size-medium wp-image-54 " alt="First 18 results" src="http://brunops.org/wp-content/uploads/2012/12/snapshot2-289x300.png" width="289" height="300" /></a> First 18 tests and results[/caption]

At first it was okay, and I managed to perform pretty much all of my tests using it. I know that I could (maybe should) have used a test library for it, like Jasmine, buy hey, it's cool to reinvent the wheel once in a while, just to get the feeling that you can.

This kind of tests don't garantee that everything will work once rewriten to Apache rewrite rules, as they were only a simulation. So I still had to test it again on Apache once it was ready. Just to make sure... after all, regular expressions are pretty much the same everywhere, correct?

Then, I continued to perform all my tests, trying out different odd combinations of possibilities. So, I was in the exercise of breaking my code, fixing the regex, breaking the code again, fixing the regex once more, and so on and so forth... Suddenly, I needed to use a lookbehind constructor in my regular expression to cover my tests. This is the point when things start to get weird.

I had my regex set up an ready to roll, I had the great <a class="vt-p" href="http://www.regular-expressions.info/">Regular-Expressions.info</a> opened, things looked right, expressions should work, but they simply didn't. I was trying to figure out why a simple expression as <strong>/(?&lt;=a)b/ig.test("ab")</strong> didn't match. Didn't even have a correct syntax!

Then, it hit me. In a glimpse of lucidity, I remembered that once upon a time, when studying a bit of regular expressions, I may have read that some regex flavors do not support everything. So googling a bit, I've ended up in the <a class="vt-p" href="http://www.regular-expressions.info/lookaround.html">Lookarounds Section</a>. As we can see, our dear friend JavaScript does not support lookbehinds. No one is perfect.

I didn't want to discard all my cool test suite that I've coded with such care. So I start searching for workarounds on how to simulate lookbehinds in JavaScript. I have found some solutions over the web, but nothing really worked well for me. And then, I realized that simulating over a simulation, is not what I call trustworthy.

Time for a different approach. I would have to discard all my code, but that happens. The approach should be something that we really can put some confidence on. I couldn't find anything really helpfull at first, so I got a bit demotivated..

I forgot it for a while and started browsing random stuff, when I decided to check out the <a class="vt-p" href="http://yeoman.io/">Yeoman</a> project. Reading a bit, I've found about PhantomJS, and then, CasperJS. And here is where the story start getting interesting.

And that's the next subject. Automated unit testing using CasperJS. Hopefully, with less story, and more coding.
