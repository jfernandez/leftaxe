ig.module(
  'game.entities.stairs'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityStairs = ig.Entity.extend({

    size: {x: 8, y: 8},
    _wmDrawBox: true,
    _wmBoxColor: 'rgba(255, 0, 0, 0.5)',
    checkAgainst: ig.Entity.TYPE.A,

    messageTimer: null,
    font: new ig.Font('media/04b03.font.png'),

    update: function() {},

    check: function(other) {
      this.messageTimer = new ig.Timer(2);
      other.kill();
      ig.game.spawnEntity(EntityArcher, 160, 96);
    },

    draw: function() {
      if(this.messageTimer && this.messageTimer.delta() < 0) {
        this.font.draw('Sorry, this is just a demo', 75, 110, ig.Font.ALIGN.CENTER);
      }
    }
  });
});