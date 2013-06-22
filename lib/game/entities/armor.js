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

EntityArmor.ITEMS = {
  "Leather Jacket":        {baseArmorClass: 1, spriteIndex: 0, minLevel: 1, maxLevel: 10, weight: 100},
  "Leather Armor":         {baseArmorClass: 2, spriteIndex: 0, minLevel: 1, maxLevel: 10, weight: 30},
  "Orcish Ring Mail":      {baseArmorClass: 2, spriteIndex: 1, minLevel: 1, maxLevel: 10, weight: 20},
  "Studded Leather Armor": {baseArmorClass: 3, spriteIndex: 0, minLevel: 1, maxLevel: 10, weight: 20},
  "Ring Mail":             {baseArmorClass: 3, spriteIndex: 2, minLevel: 1, maxLevel: 10, weight: 10},
  "Dragon Scales":         {baseArmorClass: 3, spriteIndex: 2, minLevel: 1, maxLevel: 10, weight: 5},
  "Orcish Chain Mail":     {baseArmorClass: 4, spriteIndex: 3, minLevel: 1, maxLevel: 10, weight: 5},
  "Scale Mail":            {baseArmorClass: 4, spriteIndex: 3, minLevel: 1, maxLevel: 10, weight: 5},
  "Elven Mithril-Coat":    {baseArmorClass: 5, spriteIndex: 4, minLevel: 1, maxLevel: 10, weight: 5},
  "Chain Mail":            {baseArmorClass: 5, spriteIndex: 4, minLevel: 1, maxLevel: 10, weight: 5}
};

EntityArmor.sumOfWeights = function() {
  var sum = 0;
  for (var key in EntityArmor.ITEMS) {
    sum += EntityArmor.ITEMS[key].weight;
  }
  return sum;
};

ig.merge(EntityItem.ITEMS, EntityArmor.ITEMS);

});
