// This class is responsible for populating a dungeon with items
ig.module(
  'game.itemizer'
)
.requires(
  'impact.impact',
  'game.entities.weapon',
  'game.entities.armor'
)
.defines(function() {
  Itemizer = ig.Class.extend({

    armorRatio: 0.5,
    weaponRatio: 0.5,
    maximumItems: 8,
    armor: [],
    weapons: [],

    init: function() {
      var armorCount = this.maximumItems * this.armorRatio;
      var weaponCount = this.maximumItems * this.weaponRatio;
      var i;

      for(i = 1; i <= armorCount; i++) {
        this.armor.push(this.randomItem(EntityArmor.ITEMS));
      }

      for(i = 1; i <= weaponCount; i++) {
        this.weapons.push(this.randomItem(EntityWeapon.ITEMS));
      }
    },

    randomItem: function(items) {
      var totalWeight = _.reduce(items, function(sum, item){ return sum + item.weight; }, 0);
      var cumulativeWeight = 0;
      var random = Math.floor(Math.random() * totalWeight);
      var key, item;

      for (key in items) {
        item = items[key];
        cumulativeWeight += item.weight;
        if (random < cumulativeWeight)
          return key;
      }
    }

  });
});