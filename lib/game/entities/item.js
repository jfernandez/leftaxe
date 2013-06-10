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
    this.addAnim('idle', 0.1, [this.spriteIndex]);
    this.currentAnim = this.anims.idle;
  },

  description: function() {
    return this.name;
  },

  // Default all items to a neutral AC
  armorClass: function() {
    return 0;
  },

  // Add item to the inventory on collision with the player
  check: function(other) {
    ig.game.log.push("You pick up a " + this.name);
    ig.game.inventory.addItem(this);
    this.kill();
  },

  // Set in your sub class
  items: {}

});

});