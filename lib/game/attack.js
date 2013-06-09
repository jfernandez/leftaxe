ig.module(
  'game.attack'
)
.requires(
  'impact.impact',
  'game.dice'
)
.defines(function() {
  Attack = ig.Class.extend({

    attacker: null,
    defender: null,
    hit: false,
    damage: 0,
    attackRoll: 0,
    attackDice: new Dice(20),

    init: function(attacker, defender) {
      this.attacker = attacker;
      this.defender = defender;
      this.attackRoll = this.attackDice.roll();
      if(this.attackRoll <= this.targetNumber()) {
        this.hit = true;
        this.damage = attacker.attackDamage();
      }
    },

    // An attacker must roll this number or less to land a hit
    targetNumber: function() {
      return 10 + this.defender.AC() + this.attacker.level();
    }

  });
});