ig.module(
  'game.entities.character'
)
.requires(
  'impact.entity',
  'plugins.dice'
)
.defines(function() {
  EntityCharacter = ig.Entity.extend({

    baseAC: 10,
    baseLevel: 0,
    baseExperience: 0,
    attackDice: new Dice(20, 1),
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
      var targetNumber = 10 + other.AC() + this.level();
      var attackRoll = this.attackDice.roll();
      var result = { targetNumber: targetNumber, attackRoll: attackRoll, hit: false, damage: 0 };

      if(attackRoll <= targetNumber) {
        result.hit = true;
        result.damage = this.damageDice.roll();
      }

      return result;
    }
  });
});