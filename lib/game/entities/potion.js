ig.module(
  'game.entities.potion'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityPotion = ig.Entity.extend({

    animSheet: new ig.AnimationSheet('media/objects.png', 8, 8),
    size: {x: 8, y: 8},
    checkAgainst: ig.Entity.TYPE.A,
    name: "Health Potion",

    init: function(x, y, settings) {
      this.parent(x, y, settings);
      this.addAnim('idle', 0.1, [12]);
      this.currentAnim = this.anims.idle;
    },

    check: function(other) {
      other.heal(4, this);
      ig.game.log.push(other.name + " is healed by a " + this.name);
      this.kill();
    }
  });
});