window.requestAnimFrame = (function () {
  'use strict';
  return window.requestAnimationFrame       ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         function (callback) {
           window.setTimeout(callback, 1000 / 60);
         };
})();

(function () {
  'use strict';

  /**
   * Object Pool maker
   */
  function ObjectPoolMaker(Constructor, size) {
    var objectPool = [],
        nextAvailableIndex = 0,
        poolSize = 1;

    if (size) {
      expandPool(size);
    }

    function expandPool(newSize) {
      var i;

      for (i = 0; i < newSize - poolSize; i++) {
        objectPool.push(new Constructor());
      }

      poolSize = newSize;
    }

    return {
      create: function () {
        if (nextAvailableIndex >= poolSize - 1) {
          expandPool(poolSize * 2);
        }

        var obj = objectPool[nextAvailableIndex];
        obj.index = nextAvailableIndex;
        nextAvailableIndex += 1;
        Constructor.apply(obj, arguments);

        return obj;
      },

      destroy: function (obj) {
        nextAvailableIndex -= 1;

        var lastObj = objectPool[nextAvailableIndex],
            lastObjIndex = lastObj.index;

        objectPool[nextAvailableIndex] = obj;
        objectPool[obj.index] = lastObj;

        lastObj.index = obj.index;
        obj.index = lastObjIndex;
      },

      size: function () {
        return nextAvailableIndex;
      },

      objectPool: function () {
        return objectPool;
      }
    };
  }

  /**
   * Entities
   */
  function Entity(x, y, width, height, spriteSrc, framesPosition, frameCooldown, speed, renderedWidth, renderedHeight) {
    this.init(x, y, width, height, spriteSrc, framesPosition, frameCooldown, speed, renderedWidth, renderedHeight);
  }

  Entity.prototype.init = function (x, y, width, height, spriteSrc, framesPosition, frameCooldown, speed, renderedWidth, renderedHeight) {
    this.x = x;
    this.y = y;

    this.constructor.width = width;
    this.constructor.height = height;

    this.constructor.renderedWidth = renderedWidth ? renderedWidth : width;
    this.constructor.renderedHeight = renderedHeight ? renderedHeight : height;

    this.constructor.spriteSrc = spriteSrc;
    this.constructor.framesPosition = this.constructor.framesPosition || framesPosition;
    this.constructor.frameCooldown = frameCooldown;
    this.lastFrameUpdate = Date.now();
    this.currentFrame = 0;
    if (spriteSrc) {
      this.loadSprite();
    }

    // Speed is defined as pixels per second
    this.speed = speed || 200;
  };

  Entity.prototype.loadSprite = function () {
    if (this.constructor.spriteLoaded) {
      return;
    }

    var self = this;

    this.constructor.spriteLoaded = false;
    this.constructor.sprite = new Image();

    this.constructor.sprite.src = this.constructor.spriteSrc;
    this.constructor.sprite.onload = function () {
      self.constructor.spriteLoaded = true;
    };
  };

  Entity.prototype.setPosition = function (x, y) {
    this.setX(x);
    this.setY(y);
  };

  Entity.prototype.setX = function (x) {
    this.x = x;
  };

  Entity.prototype.setY = function (y) {
    this.y = y;
  };

  Entity.prototype.render = function (context) {
    if (this.constructor.spriteLoaded) {
      context.drawImage(
        this.constructor.sprite,
        this.constructor.framesPosition[this.currentFrame][0],
        this.constructor.framesPosition[this.currentFrame][1],
        this.constructor.width,
        this.constructor.height,
        this.x,
        this.y,
        this.constructor.renderedWidth,
        this.constructor.renderedHeight);
    }
  };

  Entity.prototype.update = function (now) {
    now = now || Date.now();

    if (now - this.lastFrameUpdate > this.constructor.frameCooldown) {
      this.currentFrame += 1;
      this.lastFrameUpdate = now;
      if (this.constructor.framesPosition.length <= this.currentFrame) {
        this.currentFrame = 0;
      }
    }
  };

  // allow a little bit of proximity between entities before considering
  // a collision, it improves the experience, otherwise some
  // entities collide before it was expected
  Entity.adjust = 5;
  Entity.prototype.isCollided = function (entity2) {
    // no collision if there's any gap
    return !(this.x + this.constructor.renderedWidth - Entity.adjust <= entity2.x ||
      this.x > entity2.x + entity2.constructor.renderedWidth - Entity.adjust      ||
      this.y + this.constructor.renderedHeight - Entity.adjust <= entity2.y       ||
      this.y > entity2.y + entity2.constructor.renderedHeight - Entity.adjust
    );
  };

  /**
   * Player
   */
  function Player(x, y, speed) {
    Entity.call(this,
      x,
      y,
      Player.width,
      Player.height,
      'public/images/sprites/heroes.png',
      [[105, 142]],
      0,
      speed || 150
    );

    this.level = 1;
  }

  Player.width = 32;
  Player.height = 48;

  Player.prototype = new Entity();
  Player.prototype.constructor = Player;

  /**
   * Zombies
   */
  function Zombie(x, y, speed) {
    Entity.call(this,
      x,
      y,
      32,
      32,
      'public/images/sprites/zombies.png',
      [[0, 32], [32, 32], [64, 32], [32, 32]],
      220,
      speed || (12 + Math.random() * 15)
    );

    // there are 8 different zombie types in sprites/zombie.png
    this.zombieType = Math.floor(Math.random() * 8);
  }

  Zombie.prototype = new Entity();
  Zombie.prototype.constructor = Zombie;

  // Define frames position for each type of possible zombie
  Zombie.framesPosition = [
    [[0, 32], [32, 32], [64, 32], [32, 32]],
    [[96, 32], [128, 32], [160, 32], [128, 32]],
    [[192, 32], [224, 32], [256, 32], [224, 32]],
    [[288, 32], [320, 32], [352, 32], [320, 32]],
    [[0, 160], [32, 160], [64, 160], [32, 160]],
    [[96, 160], [128, 160], [160, 160], [128, 160]],
    [[192, 160], [224, 160], [256, 160], [224, 160]],
    [[288, 160], [320, 160], [352, 160], [320, 160]]
  ];

  // Override render method from Entity to consider zombie type
  Zombie.prototype.render = function (context) {
    if (Zombie.spriteLoaded) {
      context.drawImage(
        Zombie.sprite,
        Zombie.framesPosition[this.zombieType][this.currentFrame][0],
        Zombie.framesPosition[this.zombieType][this.currentFrame][1],
        Zombie.width,
        Zombie.height,
        this.x,
        this.y,
        Zombie.renderedWidth,
        Zombie.renderedHeight);
    }
  };

  // Override update method from Entity yo consider zombie type
  Zombie.prototype.update = function (now) {
    now = now || Date.now();

    if (now - this.lastFrameUpdate > Zombie.frameCooldown) {
      this.currentFrame += 1;
      this.lastFrameUpdate = now;
      if (Zombie.framesPosition[0].length <= this.currentFrame) {
        this.currentFrame = 0;
      }
    }
  };

  /**
   * Projectiles
   */
  function Projectile(x, y, speed, power) {
    Entity.call(this,
      x,
      y,
      45,
      35,
      'public/images/sprites/fireball2.png',
      [[0, 290]],
      0,
      speed || 400,
      35,
      25
    );

    this.power = power || 1;
  }

  Projectile.prototype = new Entity();
  Projectile.prototype.constructor = Projectile;

  /**
   * Explosions
   */
  function Explosion(x, y) {
    Entity.call(this,
      x,
      y,
      32,
      52,
      'public/images/sprites/fireball2.png',
      [[0, 7], [32, 7], [64, 7], [96, 7]],
      100,
      0,
      32,
      32
    );
  }

  Explosion.prototype = new Entity();
  Explosion.prototype.constructor = Explosion;

  /**
   * Flash Messages
   */
  function FlashMessage(message, x, y, color, size, font) {
    this.init(message, x, y, color, size, font);
  }

  FlashMessage.prototype.init = function (message, x, y, duration, color, size, font) {
    this.message = message;
    this.x = x;
    this.y = y;
    this.duration = duration;
    this.color = color || '#fff';
    this.size = size || '14px';
    this.font = font || 'Helvetica';

    this.createdAt = Date.now();
  };

  FlashMessage.prototype.render = function (context) {
    context.fillStyle = this.color;
    context.font = [this.size, this.font].join(' ');
    context.textAlign = 'left';
    context.textBaseline = 'top';
    context.fillText(this.message, this.x, this.y);
  };


  /**
   * Full Game object
   */
  var Game = {
    init: function () {
      Game.canvas = document.getElementById('game-canvas');
      Game.context = Game.canvas.getContext('2d');

      Game.loadBackground();
      Game.bind();
      Game.reset();
    },

    hasLeveled: function (level) {
      return Game.score > Game.neededScoreForLevel(level + 1);
    },

    neededScoreForLevel: function (level) {
      return Math.floor(Math.pow(level, 3) * 100) + 1000;
    },

    bind: function () {
      document.addEventListener('keydown', function (e) {
        Game.keysDown[e.keyCode] = true;

        // prevent window from scrolling when pressing UP or DOWN or SPACE
        if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 32) {
          e.preventDefault();
        }
      }, false);

      document.addEventListener('keyup', function (e) {
        delete Game.keysDown[e.keyCode];

        // prevent window from scrolling when pressing UP or DOWN or SPACE
        if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 32) {
          e.preventDefault();
        }
      }, false);

      window.addEventListener('blur', function () {
        Game.keysDown = {};
      }, false);

      document.getElementById('play-again').addEventListener('click', function () {
        Game.reset();
      }, false);
    },

    reset: function () {
      // Current game difficulty
      Game.difficulty = 0.01;

      // Max difficulty that Game can reach at any given time
      // It represents the chance percentage of spawning a new Zombie
      Game.maxDifficulty = 0.40;

      // How much difficulty increases after its cooldown elapsed
      Game.difficultyIncrement = 0.005;

      // How long it takes (in seconds) to difficulty to increase
      Game.difficultyCooldown = 4;

      // Last time difficulty was increased
      Game.lastDifficultyIncrease = 0;

      // Time elapsed since Game began
      Game.gameTime = 0;

      // Total score from killing zombies
      Game.score = 0;

      // Maps which keys as currently pressed by e.keyCode
      Game.keysDown = {};

      // Last time a projectile was shot by the player
      Game.lastProjectileTime = 0;

      // How long it takes (in ms) for another projectile to be fired
      Game.projectileCooldown = 225;

      // How much projectile speed improves after each level
      Game.projectileCooldownImprove = 25;

      // Maximum projectile speed (less is faster)
      Game.minProjectileCooldown = 100;

      // Define how many levels it takes to increase projectile power by 1
      // (huge difference)
      Game.powerUpProjectileIn = 10;

      // How many pixels Player and Zombies are constrained by vertically/horizontally
      // (this is interesting according to the background image used)
      Game.verticalBoundary = 35;
      Game.horizontalBoundary = 5;

      Game.isGameOver = false;

      Game.player = new Player(
        Game.canvas.width / 2 - Player.width / 2,
        Game.canvas.height / 2 - Player.height / 2
      );

      // Store pool of objects to be reused for each Entity
      Game.zombiePool = new ObjectPoolMaker(Zombie, 100);
      Game.projectilePool = new ObjectPoolMaker(Projectile, 100);
      Game.explosionPool = new ObjectPoolMaker(Explosion, 100);
      Game.flashMessagePool = new ObjectPoolMaker(FlashMessage, 100);

      document.getElementById('game-over-overlay').style.display = 'none';
      document.getElementById('game-over').style.display = 'none';
    },

    loadBackground: function () {
      Game.backgroundReady = false;

      Game.backgroundImg = new Image();
      Game.backgroundImg.src = 'public/images/background.png';

      Game.backgroundImg.onload = function () {
        Game.backgroundReady = true;
      };
    },

    update: function (modifier) {
      Game.gameTime += modifier;

      Game.handleInput(modifier);
      Game.handleDifficulty();
      Game.spawnZombies();
      Game.updateEntities(modifier);
    },

    handleInput: function (modifier) {
      if (Game.isGameOver) {
        return;
      }

      var now = Date.now();

      // UP
      if (Game.keysDown[38] && Game.player.y > Game.verticalBoundary) {
        Game.player.setY(Game.player.y - (Game.player.speed * modifier));
      }

      // DOWN
      if (Game.keysDown[40] && Game.player.y < Game.canvas.height - Game.verticalBoundary - Player.height) {
        Game.player.setY(Game.player.y + (Game.player.speed * modifier));
      }

      // RIGHT
      if (Game.keysDown[39] && Game.player.x < Game.canvas.width - Game.horizontalBoundary - Player.width) {
        Game.player.setX(Game.player.x + (Game.player.speed * modifier));
      }

      // LEFT
      if (Game.keysDown[37] && Game.player.x > Game.horizontalBoundary) {
        Game.player.setX(Game.player.x - (Game.player.speed * modifier));
      }

      // SPACE - shoot!
      if (Game.keysDown[32]) {
        // prevent spamming projectiles
        if (now - Game.lastProjectileTime > Game.projectileCooldown) {
          Game.projectilePool.create(
            Game.player.x,
            Game.player.y + (Player.height / 2) - (Projectile.height / 2),
            400,
            Math.floor(Game.player.level / Game.powerUpProjectileIn) + 1
          );
          Game.lastProjectileTime = now;
        }
      }
    },

    handleDifficulty: function () {
      // It gets harder as time goes by..
      if (Game.difficulty < Game.maxDifficulty &&
          Game.gameTime - Game.lastDifficultyIncrease > Game.difficultyCooldown) {
        Game.difficulty += Game.difficultyIncrement;
        Game.lastDifficultyIncrease = Game.gameTime;
      }
    },

    spawnZombies: function () {
      // Create some enemies
      if (Math.random() < Game.difficulty) {
        // resets x coordinate
        // randomize new y coordinate (constrained in available map space)
        Game.zombiePool.create(
          Game.canvas.width,
          Math.random() * (Game.canvas.height - Zombie.height - (2 * Game.verticalBoundary)) + Game.verticalBoundary
        );
      }
    },

    updateEntities: function (modifier) {
      Game.updateProjectilesAndKillZombies(modifier);
      Game.updateZombies(modifier);
      Game.updateExplosions();
      Game.updatePlayer();
      Game.updateFlashMessages(modifier);
    },

    updateProjectilesAndKillZombies: function (modifier) {
      var i,
          j,
          zombie,
          projectile;

      // update all projectiles
      for (i = 0; i < Game.projectilePool.size(); i++) {
        projectile = Game.projectilePool.objectPool()[i];

        projectile.setX(projectile.x + (projectile.speed * modifier));

        // delete projectile if out of the scene
        if (projectile.x > Game.canvas.width) {
          Game.projectilePool.destroy(projectile);
          i--;
        }
        else {
          // kill zombies!
          for (j = 0; j < Game.zombiePool.size(); j++) {
            zombie = Game.zombiePool.objectPool()[j];
            if (projectile.isCollided(zombie)) {
              Game.explosionPool.create(zombie.x, zombie.y);

              // hundred points for each zombie!
              Game.score += 100;

              // Decrease projectile power and
              projectile.power--;
              // destroy projectile if it has no more power
              if (projectile.power === 0) {
                Game.projectilePool.destroy(projectile);
                i--;
              }

              Game.flashMessagePool.create(
                '+ 100',
                zombie.x,
                zombie.y,
                500
              );
              Game.zombiePool.destroy(zombie);
              j--;

              break;
            }
          }
        }
      }
    },

    updateZombies: function (modifier) {
      var zombie,
          i,
          now = Date.now();

      // update all enemies
      for (i = 0; i < Game.zombiePool.size(); i++) {
        zombie = Game.zombiePool.objectPool()[i];
        zombie.update(now);
        zombie.setX(zombie.x - (zombie.speed * modifier));

        // delete zombie if out of the scene
        if (zombie.x + Zombie.width < 0) {
          Game.zombiePool.destroy(zombie);
          i--;
        }
      }
    },

    updateExplosions: function () {
      var i,
          explosion;

      for (i = 0; i < Game.explosionPool.size(); ++i) {
        explosion = Game.explosionPool.objectPool()[i];
        explosion.update();
        if (explosion.currentFrame >= Explosion.framesPosition.length - 1) {
          Game.explosionPool.destroy(explosion);
        }
      }
    },

    updatePlayer: function () {
      var zombie,
          i;

      if (!Game.isGameOver) {
        for (i = 0; i < Game.zombiePool.size(); ++i) {
          zombie = Game.zombiePool.objectPool()[i];
          if (zombie.isCollided(Game.player)) {
            Game.gameOver();
            break;
          }
        }
      }

      // Level up!
      if (Game.hasLeveled(Game.player.level)) {
        Game.player.level += 1;
        Game.flashMessagePool.create(
          'Level ' + Game.player.level,
          Game.player.x,
          Game.player.y,
          700,
          '#E2E215',
          '18px'
        );

        // power up ?
        if (Game.player.level % 10 === 0) {
          Game.flashMessagePool.create(
            'Power Up!',
            Game.player.x,
            Game.player.y - Player.height / 2,
            1000,
            '#34FAC3',
            '16px'
          );
        }

        Game.projectileCooldown -= Game.projectileCooldownImprove;
        if (Game.projectileCooldown < Game.minProjectileCooldown) {
          Game.projectileCooldown = Game.minProjectileCooldown;
        }
      }
    },

    updateFlashMessages: function (modifier) {
      var i,
          flashMessage,
          now = Date.now();

      for (i = 0; i < Game.flashMessagePool.size(); ++i) {
        flashMessage = Game.flashMessagePool.objectPool()[i];
        flashMessage.y -= modifier * 10;
        if (now - flashMessage.createdAt > flashMessage.duration) {
          Game.flashMessagePool.destroy(flashMessage);
        }
      }
    },

    gameOver: function () {
      document.getElementById('game-over-overlay').style.display = 'block';
      document.getElementById('game-over').style.display = 'block';
      Game.isGameOver = true;
    },

    render: function () {
      var i;

      // Render Background
      if (Game.backgroundReady) {
        Game.context.drawImage(Game.backgroundImg, 0, 0);
      }

      // Render Projectiles
      for (i = 0; i < Game.projectilePool.size(); ++i) {
        Game.projectilePool.objectPool()[i].render(Game.context);
      }

      // Render Explosions
      for (i = 0; i < Game.explosionPool.size(); ++i) {
        Game.explosionPool.objectPool()[i].render(Game.context);
      }

      // Render Zombies
      for (i = 0; i < Game.zombiePool.size(); ++i) {
        Game.zombiePool.objectPool()[i].render(Game.context);
      }

      // Render Player
      if (!Game.isGameOver) {
        Game.player.render(Game.context);
      }

      // Render Flash messages
      for (i = 0; i < Game.flashMessagePool.size(); ++i) {
        Game.flashMessagePool.objectPool()[i].render(Game.context);
      }

      // Render score
      Game.renderStatus();
    },

    renderStatus: function () {
      Game.context.fillStyle = '#fff';
      Game.context.font = '20px Helvetica';
      Game.context.textAlign = 'left';
      Game.context.textBaseline = 'top';

      Game.context.fillText('Score: ' + Game.score, 10, 5);
      Game.context.fillText('Level: ' + Game.player.level, Game.canvas.width - 110, 5);
    }
  };

  /**
   * Initialize Game and main event loop
   */
  Game.init();

  var before = Date.now();
  window.requestAnimFrame(function update() {
    var now = Date.now(),
        delta = now - before;

    Game.update(delta / 1000);
    Game.render();

    before = now;
    window.requestAnimFrame(update);
  });
}());
