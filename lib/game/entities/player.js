ig.module(
  'game.entities.player'
)
.requires(
  'game.entities.character',
  'game.entities.armor',
  'game.entities.weapon',
  'plugins.fov'
)
.defines(function(){

  EntityPlayer = EntityCharacter.extend({

    collides: ig.Entity.COLLIDES.ACTIVE,
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.B,

    size: {x: 8, y: 8},
    health: 20,
    maxHealth: 20,
    gridSpeed: { x: 50, y: 50 },
    name: "Player",
    timePressed: 0,
    repeatWait: 0,
    fov: null,

    // Load an animation sheet
    animSheet: new ig.AnimationSheet('media/player.png', 8, 8),

    init: function(x, y, settings) {
      // Call the parent constructor
      this.parent(x, y, settings);

      // Add animations for the animation sheet
      this.addAnim('right', 0.1, [0]);
      this.addAnim('down', 0.1, [1]);
      this.addAnim('left', 0.1, [2]);
      this.addAnim('up', 0.1, [3]);

      this.currentAnim = this.anims.right;

      this.fov = new FOV(this, 5);

      var armor1 = new EntityArmor(0, 0 , {name: 'Leather Armor'});
      var armor2 = new EntityArmor(0, 0 , {name: 'Ring Mail'});
      var armor3 = new EntityArmor(0, 0 , {name: 'Elven Mithril-Coat'});
      var weapon = new EntityWeapon(0, 0 , {name: 'Long Sword'});

      ig.game.inventory.addItem(armor1);
      ig.game.inventory.addItem(armor2);
      ig.game.inventory.addItem(armor3);
      ig.game.inventory.addItem(weapon);
      this.armor = armor1;
    },

    act: function () {
      ig.game.engine.lock();

      // Compute FOV once per turn
      this.fov.compute();
    },

    update: function() {
      this.parent();

      if (ig.game.state == 'inventory') return;

      var moved = false;
      var dirX = 0;
      var dirY = 0;
      var newX = 0;
      var newY = 0;

      if (ig.input.pressed('left')) {
        dirX = -8;
        this.currentAnim = this.anims.left;
        this.timePressed = -5;
      }
      else if (ig.input.pressed('right')) {
        dirX = 8;
        this.currentAnim = this.anims.right;
        this.timePressed = -5;
      }
      else if (ig.input.pressed('up')) {
        dirY = -8;
        this.currentAnim = this.anims.up;
        this.timePressed = -5;
      }
      else if (ig.input.pressed('down')) {
        dirY = 8;
        this.currentAnim = this.anims.down;
        this.timePressed = -5;
      }

      // Hold down to move logic
      if (ig.input.state('left')) {
        this.timePressed++;
        if(this.timePressed > this.repeatWait) {
          dirX = -8;
          this.currentAnim = this.anims.left;
          this.timePressed = 0;
        }
      }
      else if (ig.input.state('right')) {
        this.timePressed++;
        if(this.timePressed > this.repeatWait) {
          dirX = 8;
          this.currentAnim = this.anims.right;
          this.timePressed = 0;
        }
      }
      else if (ig.input.state('up')) {
        this.timePressed++;
        if(this.timePressed > this.repeatWait) {
          dirY = -8;
          this.currentAnim = this.anims.up;
          this.timePressed = 0;
        }
      }
      else if (ig.input.state('down')) {
        this.timePressed++;
        if(this.timePressed > this.repeatWait) {
          dirY = 8;
          this.currentAnim = this.anims.down;
          this.timePressed = 0;
        }
      }

      moved = dirX !== 0 || dirY !== 0;

      if(moved) {
        // The new tile we're trying to move to
        newX = this.pos.x + dirX;
        newY = this.pos.y + dirY;

        if(ig.game.passableTile(Math.floor(newX / 8), Math.floor(newY / 8))) {
          this.pos.x = newX;
          this.pos.y = newY;
        }

        ig.game.engine.unlock();
      }
    },

    check: function( other ){
      this.parent(other);
      this.fight(other);
    }

  });
});