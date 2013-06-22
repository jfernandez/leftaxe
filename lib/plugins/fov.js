ig.module(
  'plugins.fov'
)
.requires(
  'impact.impact'
)
.defines(function() {
  FOV = ig.Class.extend({

    entity: null,
    algorithm: null,
    viewedTiles: {},
    visibilityRadius: 5,

    init: function(entity, visibilityRadius) {
      this.entity = entity;
      this.visibilityRadius = visibilityRadius;
      this.algorithm = new ROT.FOV.PreciseShadowcasting(_.bind(this._inputCallback, this));
    },

    compute: function() {
      var posX = Math.floor(this.entity.pos.x / 8);
      var posY = Math.floor(this.entity.pos.y / 8);
      this.algorithm.compute(posX, posY, this.visibilityRadius, _.bind(this._outputCallback, this));
    },

    _inputCallback: function(x, y) {
      var door = ig.game.dungeon.doors[x + ',' + y];
      if(door) {
        return false;
      }

      var row = ig.game.dungeon.collisionTiles[y];
      var tile = null;

      if(row) {
        tile = row[x];
      }

      if(typeof tile === "undefined") {
        return false;
      } else {
        return tile === 0;
      }
    },

    _outputCallback: function(x, y, r, visibility) {
      //newX = Math.floor(x * 16);
      //newY = Math.floor(y * 16);
      //ig.system.context.fillStyle = "rgba(255, 255, 255, 0.1)";
      //ig.system.context.fillRect(newX, newY, 16, 16);

      // Mark tile as viewed
      tile = x + ',' + y;
      this.viewedTiles[tile] = true;
    }

  });
});