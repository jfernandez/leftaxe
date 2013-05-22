ig.module(
  'game.entities.skeleton'
)
.requires(
  'game.entities.character'
)
.defines(function() {
  EntitySkeleton = EntityCharacter.extend({

    collides: ig.Entity.COLLIDES.FIXED,
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    size: {x: 8, y: 8},
    animSheet: new ig.AnimationSheet('media/undead.png', 8, 8),
    name: "Skeleton",
    health: 3,
    baseExperience: 7,
    baseAC: 9,

    init: function(x, y, settings) {
      this.parent(x, y, settings);
      this.addAnim('idle', 0.1, [0]);
      this.currentAnim = this.anims.idle;
    },

    act: function () {
      ig.game.engine.lock();

      var targetX = Math.floor(ig.game.player.pos.x / 8);
      var targetY = Math.floor(ig.game.player.pos.y / 8);
      var currentX = Math.floor(this.pos.x / 8);
      var currentY = Math.floor(this.pos.y / 8);
      var distance = Math.sqrt(Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2));

      // Only kick in pathfinding if close to the enemy
      if(distance < 7) {
        var astar = new ROT.Path.AStar(targetX, targetY, ig.game.passableTile.bind(ig.game), { topology: 4 });
        var path = [];
        var pathCallback = function(x, y) {
          path.push([x, y]);
        };
        astar.compute(currentX, currentY, pathCallback);

        path.shift();
        if(path.length > 0) {
          var newX = Math.floor(path[0][0] * 8);
          var newY = Math.floor(path[0][1] * 8);
          this.pos.x = newX;
          this.pos.y = newY;
        }
      }

      ig.game.engine.unlock();
    }
  });
});