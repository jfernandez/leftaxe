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
  icons: new ig.Image('media/weapon-large.png'),

  items: {
    "Dagger":     {spriteIndex: 0},
    "Long Sword": {spriteIndex: 1},
    "Excalibur":  {spriteIndex: 2}
  }
});

});
