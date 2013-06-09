ig.module(
  'game.entities.character'
)
.requires(
  'impact.entity',
  'game.dice',
  'game.attack'
)
.defines(function() {
  EntityCharacter = ig.Entity.extend({

    // Equipment
    armor: null,
    weapon: null,
    shield: null,

    // Stats
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

    act: function() {},

    // TODO: Add armor protection
    AC: function() {
      return this.baseAC;
    },

    armorClass: function() {
      return this.baseAC - this._equipmentArmorClass();
    },

    _equipmentArmorClass: function() {
      var amount = 0;
      if (this.armor) amount += this.armor.armorClass();
      if (this.shield) amount += this.shield.armorClass();
      return amount;
    },

    level: function() {
      return this.baseLevel;
    },

    heal: function(amount, from) {
      this.health += amount;
      if (this.health > this.maxHealth) {
        this.health = this.maxHealth;
      }
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