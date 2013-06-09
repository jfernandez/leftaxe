ig.module(
  'game.entities.item'
)
.requires(
  'impact.entity'
)
.defines(function() {

EntityItem = ig.Entity.extend({

  spriteIndex: 0,
  spriteSize: 8,
  largeSpriteSize: 16,
  size: {x: 8, y: 8},
  checkAgainst: ig.Entity.TYPE.A,

  init: function(x, y, settings) {
    var item = this.items[settings.name];
    this.parent(x, y, ig.merge(settings, item));
    this.addAnim('default', 0.1, [this.spriteIndex]);
    this.currentAnim = this.anims.idle;
  },

  // Add to the inventory on collision with the player
  check: function(other) {
    ig.game.inventory.addItem(this);
    this.kill();
  },

  // Set in your sub class
  items: {}

});

});