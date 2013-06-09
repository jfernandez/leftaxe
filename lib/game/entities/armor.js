ig.module(
  'game.entities.armor'
)
.requires(
  'game.entities.item'
)
.defines(function() {

EntityArmor = EntityItem.extend({

  animSheet: new ig.AnimationSheet('media/armor.png', 8, 8),
  icons: new ig.Image('media/armor-large.png'),

  armorClass: function() {
    return this.baseArmorClass;
  },

  description: function() {
    return "Armor Class: " + this.armorClass();
  },

  items: {
    "Leather Jacket":        {baseArmorClass: 1, spriteIndex: 0},
    "Leather Armor":         {baseArmorClass: 2, spriteIndex: 0},
    "Orcish Ring Mail":      {baseArmorClass: 2, spriteIndex: 1},
    "Studded Leather Armor": {baseArmorClass: 3, spriteIndex: 0},
    "Ring Mail":             {baseArmorClass: 3, spriteIndex: 2},
    "Dragon Scales":         {baseArmorClass: 3, spriteIndex: 2},
    "Orcish Chain Mail":     {baseArmorClass: 4, spriteIndex: 3},
    "Scale Mail":            {baseArmorClass: 4, spriteIndex: 3},
    "Elven Mithril-Coat":    {baseArmorClass: 5, spriteIndex: 4},
    "Chain Mail":            {baseArmorClass: 5, spriteIndex: 4}
  }
});

});
