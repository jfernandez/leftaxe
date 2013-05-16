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
    }
  });
});