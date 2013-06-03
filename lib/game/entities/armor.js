ig.module(
  'game.entities.armor'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityArmor = ig.Entity.extend({

    sprites: new ig.Image('media/armor.png'),
    largeSprites: new ig.Image('media/armor-large.png'),
    baseArmorClass: 0,
    modifier: 0,
    spriteIndex: 0,
    spriteSize: 8,
    largeSpriteSize: 16,

    init: function(name) {
      this.parent();
      var item = this.ITEMS[name];
      this.name = name;
      this.baseArmorClass = item.armorClass;
      this.spriteIndex = item.spriteIndex;
    },

    armorClass: function() {
      return this.baseArmorClass;
    },

    description: function() {
      return "Armor Class: " + this.armorClass();
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
