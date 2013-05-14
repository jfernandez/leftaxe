ig.module(
  'game.entities.archer'
)
.requires(
  'game.entities.character',
  'plugins.gridmovement'
)
.defines(function(){

  EntityArcher = EntityCharacter.extend({

    collides: ig.Entity.COLLIDES.PASSIVE,
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.B,

    size: {x: 8, y: 8},
    health: 8,
    gridSpeed: { x: 45, y: 45 },

    // Load an animation sheet
    animSheet: new ig.AnimationSheet('media/archer.png', 8, 8),

    init: function(x, y, settings) {
      // Call the parent constructor
      this.parent(x, y, settings);

      // Use the plugin for movement
      this.movement = new GridMovement(this);

      // Add animations for the animation sheet
      this.addAnim('right', 0.1, [0]);
      this.addAnim('down', 0.1, [1]);
      this.addAnim('left', 0.1, [2]);
      this.addAnim('up', 0.1, [3]);

      this.currentAnim = this.anims.left;
    },

    update: function() {
      this.parent();
      this.movement.update();

      if (ig.input.state('left')) {
        this.movement.direction = GridMovement.moveType.LEFT;
        this.currentAnim = this.anims.left;
      }
      else if (ig.input.state('right')) {
        this.movement.direction = GridMovement.moveType.RIGHT;
        this.currentAnim = this.anims.right;
      }
      else if (ig.input.state('up')) {
        this.movement.direction = GridMovement.moveType.UP;
        this.currentAnim = this.anims.up;
      }
      else if (ig.input.state('down')) {
        this.movement.direction = GridMovement.moveType.DOWN;
        this.currentAnim = this.anims.down;
      }
    },

    check: function( other ){
      this.movement.collision();
      this.parent(other);
    }

  });
});