ig.module(
  'game.entities.character'
)
.requires(
  'impact.entity',
  'plugins.dice',
  'plugins.attack'
)
.defines(function() {
  EntityCharacter = ig.Entity.extend({

    baseAC: 10,
    baseLevel: 0,
    baseExperience: 0,
    damageDice: new Dice(2, 1),

    init: function(x, y, settings) {
      this.parent(x, y, settings);
    },

    // TODO: Add armor protection
    AC: function() {
      return this.baseAC;
    },

    level: function() {
      return this.baseLevel;
    },

    attack: function(other) {
      var attack = new Attack(this, other);
      return attack;
    }
  });
});