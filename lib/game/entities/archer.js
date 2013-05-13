ig.module(
  'game.entities.archer'
)
.requires(
  'impact.entity'
)
.defines(function(){

  EntityArcher = ig.Entity.extend({

    collides: ig.Entity.COLLIDES.ACTIVE,
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.B,

    size: {x: 8, y: 8},
    health: 8,

    // Load an animation sheet
    animSheet: new ig.AnimationSheet('media/archer.png', 8, 8),

    init: function(x, y, settings) {
      // Call the parent constructor
      this.parent(x, y, settings);

      // Add animations for the animation sheet
      this.addAnim('right', 0.1, [0]);
      this.addAnim('down', 0.1, [1]);
      this.addAnim('left', 0.1, [2]);
      this.addAnim('up', 0.1, [3]);
    },

    update: function() {
      // move left or right
      var accel = 80;
      this.vel.x = 0;
      this.vel.y = 0;

      if(ig.input.state('left')) {
        this.vel.x = -accel;
        this.currentAnim = this.anims.left;
      }
      else if( ig.input.state('right') ) {
        this.vel.x = accel;
        this.currentAnim = this.anims.right;
      }
      else if( ig.input.state('up') ) {
        this.vel.y = -accel;
        this.currentAnim = this.anims.up;
      }
      else if( ig.input.state('down') ) {
        this.vel.y = accel;
        this.currentAnim = this.anims.down;
      }

      // Call the parent update() method to move the entity
      // according to its physics
      this.parent();
    }

  });
});