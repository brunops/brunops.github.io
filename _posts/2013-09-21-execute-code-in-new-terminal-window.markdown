---
layout: post
title: Execute code in new Terminal window
date: '2013-09-21T20:59:00-07:00'
---
<p>Open a new Terminal window, from the Terminal (mac os), give focus to it and run some arbitrary code:</p>
<pre class="prettyprint"><code>
osascript -e 'tell application "Terminal"
  do script "echo wazzup"' -e 'activate' -e '
end tell'
</code></pre>
<p>So this will open a new Terminal and kindly say &#8220;wazzup&#8221;, but, of course, it&#8217;s possible execute whatever you want.. have you heard about cmatrix? cowsay? sl?</p>
<p>I feel that I shouldn&#8217;t be teaching this..</p>
