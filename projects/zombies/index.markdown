---
layout: project
title: Zombies
description: HTML5 canvas game with zombies and explosions
image: zombies.png
---
<link rel="stylesheet" href="css/style.css">

HTML5 canvas game with zombies and explosions. Take a look at the code on the <a href="http://github.com/brunops/zombies-game" target="_blank">GitHub repository</a>. There's a post about it too, <a href="/zombies-html5-canvas-game">read it here</a>.

Not much secret about it..

* __ARROWS__: Move player
* __SPACE__: Shoot
* __P__: Pause

<div id="game-wrapper">
  <canvas id="game-canvas" width="512" height="480"></canvas>

  <div id="game-overlay">
    <div id="game-over">
      <p>GAME OVER</p>
      <p>Zombies ate your brainz!</p>
      <button id="play-again">Play Again</button>
    </div>
    <div id="game-paused">
      <p>GAME PAUSED</p>
      <p>So... are you too afraid to continue?</p>
      <button id="return-play">Return to Play</button>
    </div>
  </div>
</div>

<script src="js/main.js"></script>
