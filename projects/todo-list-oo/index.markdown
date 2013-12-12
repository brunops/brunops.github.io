---
layout: default
title: TODO List
---
<link rel="stylesheet" href="stylesheets/style.css">
<link href='http://fonts.googleapis.com/css?family=The+Girl+Next+Door' rel='stylesheet' type='text/css'>

<!-- Libraries -->
<script src="javascripts/lib/underscore.js"></script>
<script src="javascripts/lib/jquery.js"></script>

<!-- Models -->
<script src="javascripts/Item.js"></script>

<!-- Views -->
<script src="javascripts/ItemView.js"></script>

<!-- App -->
<script src="javascripts/App.js"></script>

<script>
  $(function() {
    new App();
    $('#new-item').focus();
  });
</script>

<div class="todo-list-oo">
  <h4><small><em>With pure vanilla JavaScript (not really..)</em></small></h4>
  <div>
    <input id="new-item" type="text" placeholder="What to do next?" autofocus>
    <ul id="todo-list"></ul>
  </div>
</div>

<script type="html/template" id="item">
  <li>
    <input class="item-status" type="checkbox" <%= finished ? 'checked' : '' %>>
    <span><%- text %></span>
    <button class="destroy">Remove</button>
  </li>
</script>
