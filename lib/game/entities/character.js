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
    experience: 0,
    baseExperience: 0,
    health: 10,
    maxHealth: 10,
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

    fight: function(other) {
      this.attack(other);
      other.attack(this);
      if(!other.alive()) {
        this.experience += other.baseExperience;
      }
    },

    attack: function(other) {
      if(this.alive() && other.alive()) {
        var attack = new Attack(this, other);
        if(attack.hit) {
          ig.game.log.push(this.name + " hits " + other.name + " for " + attack.damage);
          other.receiveDamage(attack.damage, this);
        } else {
          ig.game.log.push(this.name + " misses!");
        }
      }
    },

    attackDamage: function() {
      return this.damageDice.roll();
    },

    receiveDamage: function(amount, from) {
      this.parent(amount, from);
      if(!this.alive()) {
        ig.game.log.push(this.name + " dies!");
      }
    },

    alive: function() {
      return this.health > 0;
    }

  });
});