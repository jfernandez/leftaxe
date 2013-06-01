ig.module(
  'game.entities.armor'
)
.requires(
  'impact.entity'
)
.defines(function() {
  EntityArmor = ig.Entity.extend({

    animSheet: new ig.AnimationSheet('media/armor.png', 8, 8),
    image: new ig.Image('media/armor.png'),
    baseArmorClass: 0,
    modifier: 0,
    spriteIndex: 0,

    init: function(name) {
      this.parent();
      this.name = name;
      var item = this.ITEMS[name];
      this.baseArmorClass = item.armorClass;
      this.spriteIndex = item.spriteIndex;
      // this.addAnim('icon', 0.1, [item.spriteIndex]);
      // this.currentAnim = this.anims.icon;
    },

    armorClass: function() {
      return this.baseArmorClass;
    },

    ITEMS: {
      "Leather Jacket":        { armorClass: 1, spriteIndex: 0 },
      "Leather Armor":         { armorClass: 2, spriteIndex: 0 },
      "Orcish Ring Mail":      { armorClass: 2, spriteIndex: 0 },
      "Studded Leather Armor": { armorClass: 3, spriteIndex: 0 },
      "Ring Mail":             { armorClass: 3, spriteIndex: 0 },
      "Dragon Scales":         { armorClass: 3, spriteIndex: 0 },
      "Orcish Chain Mail":     { armorClass: 4, spriteIndex: 0 },
      "Scale Mail":            { armorClass: 4, spriteIndex: 0 },
      "Elven Mithril-Coat":    { armorClass: 5, spriteIndex: 0 },
      "Chain Mail":            { armorClass: 5, spriteIndex: 0 }
    }
  });

});
