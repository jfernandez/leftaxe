ig.module(
  'game.inventory'
)
.requires(
  'impact.font'
)
.defines(function(){
  Inventory = ig.Class.extend({

    font: new ig.Font('media/04b03.font.png'),
    stats: new ig.Image('media/stats.png'),
    tooltip: new ig.Image('media/tooltip.png'),
    clearColor: 'rgba(0, 0, 0, 1)',

    init: function() {
      this.selectionIndex = 0;
      this.items = [];
    },

    addItem: function(item) {
      this.items.push(item);
    },

    update: function() {
      if (ig.input.pressed('up') && this.selectionIndex !== 0) {
        this.selectionIndex--;
      }

      if (ig.input.pressed('down') && this.selectionIndex !== (this.items.length - 1)) {
        this.selectionIndex++;
      }

      if (ig.input.pressed('enter')) {
        this.selectItem();
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
        if (this.selectionIndex == i) {
          this.font.draw('=>', (ig.system.width / 2) - 37, y, ig.Font.ALIGN.CENTER);
        }

        y += 10;
      }

      this.drawStats();
      this.drawTooltip();
    },

    drawTooltip: function() {
      var item = this.selectedItem();
      this.tooltip.draw(10, 10);
      this.font.draw(item.name, 40, 23);
      this.font.draw(item.description(), 40, 45);
      item.largeSprites.drawTile(18, 18, item.spriteIndex, item.largeSpriteSize);
    },

    drawStats: function() {
      this.stats.draw(3, 245);
      this.font.draw(ig.game.player.armorClass(), 25, 272);
    },

    selectedItem: function() {
      return this.items[this.selectionIndex];
    },

    selectItem: function() {
      ig.game.player.armor = this.selectedItem();
    }

  });
});