// Example: Rolling three 20d dice
// var dice = new Dice(20, 3);
// var result = dice.roll();

ig.module(
  'game.dice'
)
.requires(
  'impact.impact'
)
.defines(function() {
  Dice = ig.Class.extend({

    sides: null,
    quantity: null,

    init: function(sides, quantity) {
      this.sides = sides;
      this.quantity = quantity || 1;
    },

    roll: function() {
      var amount = 0;
      for (var i = 1; i <= this.quantity; i++) {
        amount += this._randomNumber(this.sides);
      }
      return amount;
    },

    _randomNumber: function(max) {
      return Math.floor((Math.random() * max) + 1);
    }

  });
});