---
layout: post
title: Zombies - HTML5 canvas game
categories:
- JavaScript
- Canvas
- HTML5
- Game
- Zombies
image: zombies.png
excerpt: This HTML5 canvas game was the last "thing that moves" that I built, because zombies, right? There are lots of resources about it, I mixed a couple of them and ended up with a really interesting result, that you <a href="/projects/zombies">can play here</a>. Come back and read about it after having your brain eaten.<a href="/zombies-html5-canvas-game"><img alt="Zombies Game" src="/assets/images/zombies.png"></a>
---
This HTML5 canvas game was the last "thing that moves" that I built, because zombies, right? There are lots of resources about it, I mixed a couple of them and ended up with a really interesting result, that you [can play here](/projects/zombies). Come back and read about it after having your brain eaten.

[![Zombies Game](/assets/images/zombies.png)](/projects/zombies)

It's impressive how much can be accomplished with a canvas and a bunch of sprites. In the end, it all boils down to managing a lot of objects with state and rendering them many many times. The difference between the tutorials I followed and my implementation is that I tried to separate the concerns in well defined objects instead of having it all in the global scope, but in the end it is the same thing, some sprites, hundreds of objects and a main loop.

For a step by step tutorial I recommend reading [How to make a simple HTML5 canvas game](http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/) and [Making Sprite based Games with Canvas](http://jlongster.com/Making-Sprite-based-Games-with-Canvas). This article aims to talk about the other topics that I covered in my implementation. Mainly:

- Object Inheritance
- Object Pooler
- Entities
- Game Mechanics
- FlashMessages

##Object Inheritance
After you notice that the game is nothing but a lot of objects being constantly rendered at a specific position of the canvas it's natural to create an object that knows its position and how to render itself in order to avoid duplication.

Let's call it Entity. Everything will inherit from it. After all, players, zombies, explosions and everything else have a position on the screen and need to be rendered. In reality, they have a lot of other common properties too, like a sprite, speed, frames.. you get the idea.

{% highlight javascript %}
function Entity(x, y, width, height, sprite) {
  this.init(x, y, width, height, sprite);
}

Entity.prototype.init = function (x, y, width, height, sprite) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  var self = this;
  this.spriteLoaded = false;
  if (sprite) {
    this.sprite = new Image();
    this.sprite.src = sprite;
    this.sprite.onload = function () {
      self.spriteLoaded = true;
    };
  }
};

Entity.prototype.render = function (context) {
  if (this.spriteLoaded) {
    context.drawImage(
      this.sprite,      // image element
      0,                // position X on image where sprite starts
      0,                // position Y on image where sprite starts
      this.width,       // width of sprite on image
      this.height,      // height of sprite on image
      this.x,           // x coordinate
      this.y,           // y coordinate
      this.width,       // rendered width on canvas
      this.height       // rendered height on canvas
    );
  }
};
{% endhighlight %}

The code above has some hardcoded things (like position of sprite and rendered size), because it is a simplified version of the Entity object. Hopefully you get the idea, common properties centralized. And then, we do some prototypical inheritance with the other objects to get all of it:

{% highlight javascript %}
// Player stuff
function Player(x, y, width, height, sprite) {
  Entity.call(
    this,
    x,
    y,
    width,
    height,
    sprite
  );
}

Player.prototype = new Entity();
Player.prototype.constructor = Player;

// Zombies stuff
function Zombie(x, y, width, height, sprite) {
  Entity.call(
    this,
    x,
    y,
    width,
    height,
    sprite
  );
}

Zombie.prototype = new Entity();
Zombie.prototype.constructor = Zombie;

// Get canvas context
var context = document.getElementById('canvas').getContext('2d');

// Create them
var player = new Player(50, 50, 32, 32, 'images/player.png'),
    zombie = new Zombie(100, 50, 32, 32, 'images/zombie.png');

// render it
player.render(context);
zombie.render(context);
{% endhighlight %}

Although Player and Zombie appear to be the same, there's a lot of code reuse with this approach. The `.render` method was defined only once, and the logic to load images too. And again, this is a simplified version of the code, we can extend this with an `.update` method that moves the entities, another to check collisions and so on..

There is a deep flaw with the previous code as I noticed later, but let's talk about the next topic first, the object pooler.

##Object Pooler
I was having some performance issues when there were too many objects being rendered on the screen, and the scene was getting unmanageably laggy. And then, [I remembered an old advice from a pirate](http://www.youtube.com/watch?v=RWmzxyMf2cE), which consists in managing all your objects like a real captain and taking care of the undead, so the garbage collector beast won't come after you. You need to basically "kill your crew before ya sail" (makes sense only after you watch the video).

[This Mozilla article](https://hacks.mozilla.org/2013/05/optimizing-your-javascript-game-for-firefox-os/) was really helpful on how to implement an object pooler. I tweaked a little bit to encapsulate it into the [ObjectPoolMaker](https://github.com/brunops/zombies-game/blob/master/js/ObjectPoolMaker.js), which with the help of closures can create an object pool for any constructor function instead of putting all the logic inside the constructor function itself.

The idea of the object pooler is to keep an array of available objects, which expands when needed and reuses them instead of calling the `new` operator, destroying the reference to the object when needed and leaving dead objects to the garbage collector all the time (and avoinding multiple calls to `.splice` as well). The only caveat of this approach is that it keeps changing object positions in the array, so you can end up changing the order of two objects with overlapping positions and seeing unexpected changes in the scene (zombie1 that was behind zombie2 is suddenly in front of zombie2).

Turns out the performance issue was __not__ solved by the object pooler, the issue was due to a way more stupid reason. I kept the object pooler though, it's an interesting skill :)

##Entities
Problem was that a new `Image` object was being instanciated for each new Entity. The sprite took only 1 or 2ms to load, but the requests add up quickly when a new Zombie is created 40% of the time, in a 60 frames per second game, it represents 24 requests per second! Plus 10 new Projectiles per second. So yeah, not smart to do 30 requests per second..

The solution was really simple, the sprite image must be loaded only once per type of entity, and all the instances need to manage is its current frame position and that's all there is to it.

The challenge was how to set properties on the constructor functions, such as: `Player`, `Zombie`, `Projectile` and others, from the parent object `Entity`. Turns out it's possible to do such thing, and [this is the article](http://tobyho.com/2010/11/22/javascript-constructors-and/) that helped me do it. Let's see a simple code sample of it.

{% highlight javascript %}
function Parent() {
  this.constructor.hey = "hello there";
}

function Child() {
  Parent.apply(this, arguments);
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

// constructor needs to be run at least once
new Child();

console.log(Child.hey); // "hello there"
{% endhighlight %}

In `Parent` class, `this.constructor` refers to `Child`. It may seem a little confusing, but that allowed a lot of code reuse. And of course, loading each sprite only once.

##Game Mechanics
I usually don't follow tutorials completely, I think that by modifying the implementation a little bit and getting a slightly different outcome is a good way to notice if I actually understand it. So I extended what I've read by adding some different game mechanics.

Because the game gets extremely difficult in the end, I allowed the player to get levels after getting certain amounts of points defined by an arbitrary formula. Each level gained decreases the projectile cooldown by 25ms until it reaches another arbitrary limit, thus giving the player a feeling of accomplishment by shooting more projectiles per second.

Every 10 levels, the player "Powers Up" and the power of the projectile increases by one, killing one more zombie per shot. The difficulty of the game is in how many zombies are spawned per second. Currently it starts at `0%` and increases `0.5%` every 4 seconds, up to `40%` (all arbitrary values), which represents around `24` zombies per second, so yeah, the game is still impossible and doesn't have an end.

It's interesting how a lot of the game design was testing many different constants that rule the game until it feels balanced enough. There's [an amazing presentation](http://vimeo.com/36579366) about how valuable this creation process is and how to improve it. I highly recommend watching it.

##FlashMessages
To give an even better sense of accomplishment, flash messages were added to give highlight when an important event occurs. They end up being nothing else than yet another pool of entities that keeps getting rendered as text, the only difference is that they have an arbitrary lifespan time.

They currently display how many points the player gets for each killing, notify the user when they level up, and when they power up. These instant feedbacks greatly improve the game experience.

##Conclusion
Developing this game was an interesting experience. A lot of things that seemed like black magic last week, makes now perfect sense and are actually not hard. Click here to see the <a href="http://github.com/brunops/zombies-game" target="_blank">GitHub repository</a> with full source.

I know that there are a lot of gaming JavaScript frameworks out there, but I still didn't feel the need of it. And my opinion towards frameworks is getting worse everyday. But of course, I may use some in the future..

I really like to receive feedback, either to tell me why my code is bad or that you enjoyed it. So let me know your thoughts on the comments or shoot me an email.
