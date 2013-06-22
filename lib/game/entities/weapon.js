ig.module(
  'game.entities.weapon'
)
.requires(
  'game.entities.item'
)
.defines(function() {

EntityWeapon = EntityItem.extend({

  entityClass: "EntityWeapon",
  animSheet: new ig.AnimationSheet('media/weapon.png', 8, 8),
  icons: new ig.Image('media/weapon-large.png')
});

EntityWeapon.ITEMS = {
  // Daggers
  "Dagger":         {spriteIndex: 0, minLevel: 1, maxLevel: 10, weight: 100},
  "Orcish Dagger":  {spriteIndex: 0, minLevel: 1, maxLevel: 10, weight: 100},
  "Silver Dagger":  {spriteIndex: 0, minLevel: 1, maxLevel: 10, weight: 100},
  "Elven Dagger":   {spriteIndex: 0, minLevel: 1, maxLevel: 10, weight: 100},

  // Swords
  "Long Sword":    {spriteIndex: 1, minLevel: 1, maxLevel: 10, weight: 100},
  "Excalibur":     {spriteIndex: 2, minLevel: 1, maxLevel: 10, weight: 100}
};

ig.merge(EntityItem.ITEMS, EntityWeapon.ITEMS);

});
