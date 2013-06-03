ig.module(
  'game.inventory'
)
.requires(
  'impact.font'
)
.defines(function(){
  Inventory = ig.Class.extend({

    font: new ig.Font('media/04b03.font.png'),
    clearColor: 'rgba(0, 0, 0, 1)',

    init: function() {
      this.currentItem = 0;
      this.items = [];
    },

    addItem: function(item) {
      this.items.push(item);
    },

    update: function() {
      if (ig.input.pressed('up') && this.currentItem !== 0) {
        this.currentItem--;
      }

      if (ig.input.pressed('down') && this.currentItem !== (this.items.length - 1)) {
        this.currentItem++;
      }

      if (ig.input.pressed('enter')) {
        this.apply();
      }
    },

    draw: function() {
      if (this.clearColor) {
        ig.system.context.fillStyle = this.clearColor;
        ig.system.context.fillRect(0, 0, ig.system.realWidth, ig.system.realHeight);
      }

      var y = 20;
      for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        var description = item.name;
        if (ig.game.player.armor && item.name === ig.game.player.armor.name) {
          description += " (Worn)";
        }

        this.font.draw(description, (ig.system.width / 2) - 30, y, ig.Font.ALIGN.LEFT);

        // Draw the selection arrow
        if (this.currentItem == i) {
          this.font.draw('=>', (ig.system.width / 2) - 37, y, ig.Font.ALIGN.CENTER);
        }

        y += 10;
      }
    },

    apply: function() {
      var item = this.items[this.currentItem];
      ig.game.player.armor = item;
    }

  });
});