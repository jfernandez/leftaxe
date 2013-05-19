ig.module(
	'game.main'
)
.requires(
	'impact.game',
	'impact.font',

	'game.entities.archer',
	'game.entities.stairs',
	'game.entities.skeleton',
	'game.levels.sandbox'
)
.defines(function(){

MyGame = ig.Game.extend({

	// Load a font
	font: new ig.Font('media/04b03.font.png'),
	log: [],
	player: null,

	init: function() {
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.H, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.L, 'right' );
		ig.input.bind( ig.KEY.UP_ARROW, 'up' );
		ig.input.bind( ig.KEY.K, 'up' );
		ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
		ig.input.bind( ig.KEY.J, 'down' );
		ig.input.bind( ig.KEY.SPACE, 'shoot' );

		var dungeon = new Dungeon(40, 30, 60, 80);
		var map = new ig.BackgroundMap(8, dungeon.background_map(), 'media/dungeon.png');
		this.backgroundMaps.push(map);
		this.collisionMap = new ig.CollisionMap(8, dungeon.collision_map());
		ig.game.spawnEntity(EntityArcher, dungeon.up_stairs_pos.x * 8, dungeon.up_stairs_pos.y * 8);
		ig.game.spawnEntity(EntityStairs, dungeon.down_stairs_pos.x * 8, dungeon.down_stairs_pos.y * 8);
		//this.loadLevel(LevelSandbox);
	},

	update: function() {
		// Update all entities and backgroundMaps
		this.parent();

		// Add your own, additional update code here
	},

	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();

		this.player = this.getEntityByName('Archer');
		if(this.player) {
			this.drawHealth();
			this.drawExperience();
		}
		this.drawLog();

		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;

		//this.font.draw( 'LEFT AXE', x, 20, ig.Font.ALIGN.CENTER );
		//this.font.draw( 'An online roguelike. Coming soon...', x, 40, ig.Font.ALIGN.CENTER );
	},

	drawHealth: function() {
		this.font.draw( 'Health: ' + this.player.health, 10, 10);
	},

	drawExperience: function() {
		this.font.draw( 'XP: ' + this.player.experience, 10, 20);
	},

	drawLog: function() {
		var x = 10;
		var y = 200;
		var entriesToShow = this.log.length >= 2 ? 2 : this.log.length;

		for (var i = entriesToShow; i > 0; i--) {
			var entry = this.log[this.log.length - i];
			if (entry) {
				this.font.draw(entry, x, y);
				y += 10;
			}
		}
	}
});


// Start the Game with 60fps, a resolution of 320x240
ig.main( '#canvas', MyGame, 60, 320, 240, 3);

});
