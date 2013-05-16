ig.module(
  'game.entities.archer'
)
.requires(
  'game.entities.character',
  'plugins.gridmovement'
)
.defines(function(){

  EntityArcher = EntityCharacter.extend({

    collides: ig.Entity.COLLIDES.ACTIVE,
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.B,

    size: {x: 8, y: 8},
    health: 10,
    gridSpeed: { x: 60, y: 60 },
    name: "Archer",

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

      if (ig.input.state('left') || ig.input.released('left')) {
        this.movement.direction = GridMovement.moveType.LEFT;
        this.currentAnim = this.anims.left;
        this.fightReady = ig.input.released('left');
      }
      else if (ig.input.state('right') || ig.input.released('right')) {
        this.movement.direction = GridMovement.moveType.RIGHT;
        this.currentAnim = this.anims.right;
        this.fightReady = ig.input.released('right');
      }
      else if (ig.input.state('up') || ig.input.released('up')) {
        this.movement.direction = GridMovement.moveType.UP;
        this.currentAnim = this.anims.up;
        this.fightReady = ig.input.released('up');
      }
      else if (ig.input.state('down') || ig.input.released('down')) {
        this.movement.direction = GridMovement.moveType.DOWN;
        this.currentAnim = this.anims.down;
        this.fightReady = ig.input.released('down');
      }
    },

    check: function( other ){
      this.movement.collision();
      this.parent(other);
      if(this.fightReady) {
        this.fightReady = false;
        this.fight(other);
      }
    }

  });
});