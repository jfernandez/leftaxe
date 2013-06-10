ig.module(
  'game.main'
)
.requires(
  'impact.game',
  'impact.font',
  //'impact.debug.debug',

  'plugins.fog',

  'game.inventory',
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
  dungeon: null,
  fov: null,
  visitedTiles: {},
  freeTiles: [],
  map: null,
  mapTiles: [],
  collisionTiles: [],
  mapTileSize: { x: 45, y: 30 },
  tileCount: 0,
  console: null,

  // Fog of War
  fog: null,

  // rot.js
  engine: null,
  player: null,
  scheduler: new ROT.Scheduler.Simple(),

  // state
  state: 'game',

  inventory: new Inventory(),

  init: function() {
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

    this.fog = new Fog(this.mapTileSize.x, this.mapTileSize.y, 8);

    this.generateMap();
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

  generateMap: function() {
    this.entities = [];
    this.namedEntities = {};
    this.collisionMap = ig.CollisionMap.staticNoCollision;
    this.backgroundMaps = [];
    this.visitedTiles = {};
    this.freeTiles = [];

    // Initiliaze with all 0's or 1's
    for(var y = 0; y < this.mapTileSize.y; y++) {
      var row1 = [];
      var row2 = [];
      for(var x = 0; x < this.mapTileSize.x; x++) {
        row1.push(0);
        row2.push(1);
      }
      this.mapTiles[y] = row1;
      this.collisionTiles[y] = row2;
    }

    var digger = new ROT.Map.Digger(this.mapTileSize.x, this.mapTileSize.y, {dugPercentage: 0.8, corridorLength: [1, 3]});

    var digCallback = function(x, y, value) {
      this.collisionTiles[y][x] = value;

      if(value === 0) {
        this.freeTiles.push({x: x, y: y});
        this.mapTiles[y][x] = 1;
      } else {
        this.mapTiles[y][x] = 2;
      }
    };
    digger.create(digCallback.bind(this));

    this._drawMap();
    this._createPlayer();
    this._createEntities();

    this.engine = new ROT.Engine(this.scheduler);
    this.engine.start();
  },

  _drawMap: function() {
    var map = new ig.BackgroundMap(8, this.mapTiles, 'media/dungeon.png');
    map.preRender = true;
    map.chunkSize = 640;
    this.backgroundMaps.push(map);
    this.collisionMap = new ig.CollisionMap(8, this.collisionTiles);
  },

  _createPlayer: function() {
    var index = Math.floor(ROT.RNG.getUniform() * this.freeTiles.length);
    var pos = this.freeTiles.splice(index, 1)[0];

    var stairs = ig.game.spawnEntity(EntityStairs, pos.x * 8, pos.y * 8);
    stairs.currentAnim = stairs.anims.up;

    this.player = ig.game.spawnEntity(EntityPlayer, pos.x * 8, pos.y * 8);
    this.scheduler.add(this.player, true);
  },

  _createEntities: function () {
    var index, pos, entity;

    for(i = 0; i < 10; i++) {
      index = Math.floor(ROT.RNG.getUniform() * this.freeTiles.length);
      pos = this.freeTiles.splice(index, 1)[0];
      entity = ig.game.spawnEntity(EntitySkeleton, pos.x * 8, pos.y * 8);
      this.scheduler.add(entity, true);
    }

    // Items
    for(i = 0; i < 5; i++) {
      index = Math.floor(ROT.RNG.getUniform() * this.freeTiles.length);
      pos = this.freeTiles.splice(index, 1)[0];
      entity = ig.game.spawnEntity(EntityPotion, pos.x * 8, pos.y * 8);
    }

    // Stairs
    index = Math.floor(ROT.RNG.getUniform() * this.freeTiles.length);
    pos = this.freeTiles.splice(index, 1)[0];
    entity = ig.game.spawnEntity(EntityStairs, pos.x * 8, pos.y * 8);
  },


  // Callbacks
  viewedTile: function(x, y) {
    var key = x + ',' + y;
    return this.player.fov.viewedTiles[key];
  },

  passableTile: function(x, y) {
    var row = this.collisionTiles[y];
    var tile = null;

    if(row) {
      tile = row[x];
    }

    if(typeof tile == "undefined") {
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
  }
});

// Start the Game with 60fps
ig.main( '#canvas', LeftAxe, 30, 360, 310, 2);

});
