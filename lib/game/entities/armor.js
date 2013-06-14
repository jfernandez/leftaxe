ig.module(
  'game.entities.armor'
)
.requires(
  'game.entities.item'
)
.defines(function() {

EntityArmor = EntityItem.extend({

  entityClass: "EntityArmor",
  animSheet: new ig.AnimationSheet('media/armor.png', 8, 8),
  icons: new ig.Image('media/armor-large.png'),

  armorClass: function() {
    return this.baseArmorClass;
  },

  description: function() {
    return "Armor Class: " + this.armorClass();
  }
});

ig.merge(EntityItem.ITEMS, {
  "Leather Jacket":        {baseArmorClass: 1, spriteIndex: 0, minLevel: 1, maxLevel: 10, weight: 100},
  "Leather Armor":         {baseArmorClass: 2, spriteIndex: 0, minLevel: 1, maxLevel: 10, weight: 100},
  "Orcish Ring Mail":      {baseArmorClass: 2, spriteIndex: 1, minLevel: 1, maxLevel: 10, weight: 100},
  "Studded Leather Armor": {baseArmorClass: 3, spriteIndex: 0, minLevel: 1, maxLevel: 10, weight: 100},
  "Ring Mail":             {baseArmorClass: 3, spriteIndex: 2, minLevel: 1, maxLevel: 10, weight: 100},
  "Dragon Scales":         {baseArmorClass: 3, spriteIndex: 2, minLevel: 1, maxLevel: 10, weight: 100},
  "Orcish Chain Mail":     {baseArmorClass: 4, spriteIndex: 3, minLevel: 1, maxLevel: 10, weight: 100},
  "Scale Mail":            {baseArmorClass: 4, spriteIndex: 3, minLevel: 1, maxLevel: 10, weight: 100},
  "Elven Mithril-Coat":    {baseArmorClass: 5, spriteIndex: 4, minLevel: 1, maxLevel: 10, weight: 100},
  "Chain Mail":            {baseArmorClass: 5, spriteIndex: 4, minLevel: 1, maxLevel: 10, weight: 100}
});

});
