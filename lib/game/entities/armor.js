ig.module(
  'game.entities.armor'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityArmor = ig.Entity.extend({

    animSheet: new ig.AnimationSheet('media/armor.png', 8, 8),
    icons: new ig.Image('media/armor-large.png'),
    baseArmorClass: 0,
    modifier: 0,
    spriteIndex: 0,
    spriteSize: 8,
    largeSpriteSize: 16,
    size: {x: 8, y: 8},
    checkAgainst: ig.Entity.TYPE.A,

    init: function(x, y, settings) {
      this.parent(x, y, settings);

      var item = this.ITEMS[this.name];
      this.baseArmorClass = item.armorClass;
      this.spriteIndex = item.spriteIndex;
      this.addAnim('idle', 0.1, [this.spriteIndex]);
      this.currentAnim = this.anims.idle;
    },

    armorClass: function() {
      return this.baseArmorClass;
    },

    description: function() {
      return "Armor Class: " + this.armorClass();
    },

    check: function(other) {
      ig.game.inventory.addItem(this);
      this.kill();
    },

    ITEMS: {
      "Leather Jacket":        { armorClass: 1, spriteIndex: 0 },
      "Leather Armor":         { armorClass: 2, spriteIndex: 0 },
      "Orcish Ring Mail":      { armorClass: 2, spriteIndex: 1 },
      "Studded Leather Armor": { armorClass: 3, spriteIndex: 0 },
      "Ring Mail":             { armorClass: 3, spriteIndex: 2 },
      "Dragon Scales":         { armorClass: 3, spriteIndex: 2 },
      "Orcish Chain Mail":     { armorClass: 4, spriteIndex: 3 },
      "Scale Mail":            { armorClass: 4, spriteIndex: 3 },
      "Elven Mithril-Coat":    { armorClass: 5, spriteIndex: 4 },
      "Chain Mail":            { armorClass: 5, spriteIndex: 4 }
    }
  });

});
