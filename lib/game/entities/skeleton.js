ig.module(
  'game.entities.skeleton'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntitySkeleton = ig.Entity.extend({

    size: {x: 8, y: 8},
    checkAgainst: ig.Entity.TYPE.A,
    animSheet: new ig.AnimationSheet('media/undead.png', 8, 8),

    init: function(x, y, settings) {
      this.parent(x, y, settings);
      this.addAnim('idle', 0.1, [0]);
      this.currentAnim = this.anims.idle;
    },

    update: function() {},

    check: function(other) {
      this.kill();
    }
  });
});