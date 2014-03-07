---
layout: default
title: Zombies
description: HTML5 canvas game with zombies and explosions
image: zombies.png
---
<link rel="stylesheet" href="css/style.css">

HTML5 canvas game with zombies and explosions. Take a look at the code on the <a href="http://github.com/brunops/canvas-game" target="_blank">GitHub repository</a>.

Not much secret about it..

* __ARROWS__: Move player
* __SPACE__: Shoot

<div id="game-wrapper">
  <canvas id="game-canvas" width="512" height="480"></canvas>

  <div id="game-over-overlay"></div>
  <div id="game-over">
    <p>GAME OVER</p>
    <p>Zombies ate your brainz!</p>
    <button id="play-again">Play Again</button>
  </div>
</div>

<script src="js/main.js"></script>
