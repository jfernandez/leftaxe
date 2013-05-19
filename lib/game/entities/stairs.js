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
      this.addAnim('idle', 0.1, [23]);
      this.currentAnim = this.anims.idle;
    },

    check: function(other) {
      this.messageTimer = new ig.Timer(2);
      other.kill();
      //ig.game.spawnEntity(EntityArcher, ig.game., 96);
    },

    draw: function() {
      this.parent();
      if(this.messageTimer && this.messageTimer.delta() < 0) {
        this.font.draw('Sorry, this is just a demo', 75, 110, ig.Font.ALIGN.CENTER);
      }
    }
  });
});