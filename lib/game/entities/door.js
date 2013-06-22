ig.module(
  'game.entities.door'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityDoor = ig.Entity.extend({

    animSheet: new ig.AnimationSheet('media/dungeon.png', 8, 8),
    size: {x: 8, y: 8},
    checkAgainst: ig.Entity.TYPE.A,
    closed: true,

    init: function(x, y, settings) {
      this.parent(x, y, settings);
      this.addAnim('closed', 0.1, [2]);
      this.addAnim('open', 0.1, [3]);
      this.currentAnim = this.anims.closed;
    },

    open: function() {
      var key;
      key = (this.pos.x / 8) + ',' + (this.pos.y / 8);
      // Mark the door as now being opened
      this.closed = false;
      this.currentAnim = this.anims.open;
      ig.game.dungeon.doors[key] = false;
      ig.game.player.fov.compute();
    },

    check: function(other) {
      if(this.closed) {
        this.open();
      }
    }
  });
});