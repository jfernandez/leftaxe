ig.module(
  'game.dungeon'
)
.requires(
  'impact.impact'
)
.defines(function() {

Dungeon = ig.Class.extend({

  scheduler: new ROT.Scheduler.Simple(),
  backgroundTiles: [],
  collisionTiles: [],
  freeTiles: [],

  entities: [],
  visitedTiles: {},

  init: function(width, height) {
    this.width = width;
    this.height = height;

    this.initializeMaps();
    this.generateMap();
    this.generateEntities();
  },

  load: function() {
    var map = new ig.BackgroundMap(8, this.backgroundTiles, 'media/dungeon.png');
    map.preRender = true;
    map.chunkSize = 640;
    ig.game.backgroundMaps.push(map);
    ig.game.collisionMap = new ig.CollisionMap(8, this.collisionTiles);
  },

  initializeMaps: function() {
    for (var y = 0; y < this.height; y++) {
      var row1 = [], row2 = [];
      for(var x = 0; x < this.width; x++) {
        row1.push(0);
        row2.push(1);
      }
      this.backgroundTiles[y] = row1;
      this.collisionTiles[y] = row2;
    }
  },

  generateMap: function() {
    var digger = new ROT.Map.Digger(this.width, this.height, {dugPercentage: 0.8, corridorLength: [1, 3]});

    var digCallback = function(x, y, value) {
      this.collisionTiles[y][x] = value;

      if(value === 0) {
        this.freeTiles.push({x: x, y: y});
        this.backgroundTiles[y][x] = 1;
      } else {
        this.backgroundTiles[y][x] = 2;
      }
    };
    digger.create(digCallback.bind(this));
  },

  generateEntities: function() {
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

  spawnPlayer: function(player) {
    var index = Math.floor(ROT.RNG.getUniform() * this.freeTiles.length);
    var pos = this.freeTiles.splice(index, 1)[0];

    var stairs = ig.game.spawnEntity(EntityStairs, pos.x * 8, pos.y * 8);
    stairs.currentAnim = stairs.anims.up;

    player.pos.x = pos.x * 8;
    player.pos.y = pos.y * 8;
    ig.game.entities.push(player);
    this.scheduler.add(player, true);
  }

});
});