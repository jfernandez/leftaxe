ig.module(
  'game.entities.stairs'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityStairs = ig.Entity.extend({

    animSheet: new ig.AnimationSheet('media/environment.png', 8, 8),
    size: {x: 8, y: 8},
    checkAgainst: ig.Entity.TYPE.A,

    messageTimer: null,
    font: new ig.Font('media/04b03.font.png'),

    init: function(x, y, settings) {
      this.parent(x, y, settings);
      this.addAnim('down', 0.1, [24]);
      this.addAnim('up', 0.1, [23]);
      this.currentAnim = this.anims.down;
    },

    check: function(other) {
      if (this.currentAnim === this.anims.down) {
        ig.game.loadDungeon();
      }
    }
  });
});