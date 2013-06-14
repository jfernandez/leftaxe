ig.module(
  'game.main'
)
.requires(
  //'impact.debug.debug',
  'impact.game',
  'impact.font',

  'plugins.fog',

  'game.inventory',
  'game.dungeon',
  'game.entities.player',
  'game.entities.stairs',
  'game.entities.skeleton',
  'game.entities.potion'
)
.defines(function(){

LeftAxe = ig.Game.extend({

  // Load a font
  font: new ig.Font('media/04b03.font.png'),
  hud: new ig.Image('media/hud.png'),
  hp: new ig.Image('media/hp.png'),
  log: [],

  dungeons: [],
  mapTiles: [],
  collisionTiles: [],
  mapWidth: 45,
  mapHeight: 30,
  tileCount: 0,
  tileSize: 8,
  console: null,

  // state
  state: 'game',

  init: function() {
    this.bindKeys();

    // Intantiate the game objects
    this.inventory      = new Inventory();
    this.player         = new EntityPlayer();
    this.dungeon        = new Dungeon(this.mapWidth, this.mapHeight);
    this.fog            = new ig.Fog(this.mapWidth, this.mapHeight, this.tileSize);
    this.scheduler      = new ROT.Scheduler.Simple();
    this.dungeonLevel   = 1;

    // Add the dungeon to the impact engine
    this.dungeon.load();
    this.dungeon.spawnPlayer(this.player);

    // We'll keep a stack of dungeon levels
    this.dungeons.push(this.dungeon);

    // Start our turn-based engine
    this.engine = new ROT.Engine(this.dungeon.scheduler);
    this.engine.start();
  },

  update: function() {
    // Update all entities and backgroundMaps
    this.parent();
    // Add your own, additional update code here
    if (ig.input.pressed('inventory')) {
      this.toggleState();
    }

    if (this.state === 'inventory') {
      this.inventory.update();
    }
  },

  toggleState: function() {
    if (this.state === 'game') {
      this.state = 'inventory';
    } else {
      this.state = 'game';
    }
  },

  draw: function() {
    if (this.state === 'inventory') {
      this.inventory.draw();
      return;
    }

    this.parent();

    if(this.player) {
      this.drawMenu();
    }
    this.drawLog();

    this.fog.draw(this.viewedTile.bind(this));
  },


  // Callbacks
  viewedTile: function(x, y) {
    var key = x + ',' + y;
    return this.player.fov.viewedTiles[key];
  },

  passableTile: function(x, y) {
    var row = this.dungeon.collisionTiles[y];
    var tile;

    if(row) {
      tile = row[x];
    }

    if(typeof tile === 'undefined') {
      return false;
    } else {
      return tile === 0;
    }
  },

  drawMenu: function() {
    this.hud.draw(3, 245);

    var fullBar = 82;

    // HP
    var currentHealth = Math.floor((this.player.health / this.player.maxHealth) * fullBar);
    ig.system.context.fillStyle = "red";
    ig.system.context.fillRect(59, 506, currentHealth, 8);

    // XP
    if (this.player.experience > 0) {
      var currentXP = Math.floor((this.player.experience / 100) * fullBar);
      ig.system.context.fillStyle = "yellow";
      ig.system.context.fillRect(59, 522, currentXP, 8);
    }

    // Armor
    if (this.player && this.player.armor) {
      var armor = this.player.armor;
      armor.icons.drawTile(9, 278, armor.spriteIndex, armor.largeSpriteSize);
    }

    // Stats
    this.font.draw(this.player.armorClass(), 85, 257);
    this.font.draw("[Space] for inventory", 130, 280);
  },

  drawLog: function() {
    var x = 120;
    var y = 245;
    var entriesToShow = this.log.length >= 2 ? 2 : this.log.length;

    for (var i = entriesToShow; i > 0; i--) {
      var entry = this.log[this.log.length - i];
      if (entry) {
        this.font.draw(entry, x, y);
        //this.display.drawText(0, 0, entry);
        y += 10;
      }
    }
  },

  bindKeys: function() {
    ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
    ig.input.bind( ig.KEY.H, 'left' );
    ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
    ig.input.bind( ig.KEY.L, 'right' );
    ig.input.bind( ig.KEY.UP_ARROW, 'up' );
    ig.input.bind( ig.KEY.K, 'up' );
    ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
    ig.input.bind( ig.KEY.J, 'down' );
    ig.input.bind( ig.KEY.SPACE, 'inventory');
    ig.input.bind( ig.KEY.ENTER, 'enter');
    ig.input.bind( ig.KEY.D, 'drop');
  }
});

// Start the Game with 60fps
ig.main( '#canvas', LeftAxe, 30, 360, 310, 2);

});
