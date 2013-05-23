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

LeftAxe = ig.Game.extend({

	// Load a font
	font: new ig.Font('media/04b03.font.png'),
	log: [],
	dungeon: null,
	fov: null,
	visitedTiles: {},
	freeTiles: [],
	map: null,
	mapTiles: [],
	collisionTiles: [],
	mapTileSize: { x: 40, y: 30 },
	tileCount: 0,

	// rot.js
	engine: null,
	player: null,
	scheduler: new ROT.Scheduler.Simple(),

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

		this._generateMap();

		this.fov = new ROT.FOV.PreciseShadowcasting(_.bind(this.passableTile, this));
		this.collision_map = this.mapTiles;

		this.engine = new ROT.Engine(this.scheduler);
		this.engine.start();
	},

	_generateMap: function() {
		// Initiliaze with all 0's or 1's
		for(var y = 0; y < this.mapTileSize.y; y++) {
			var row1 = [];
			var row2 = [];
			for(var x = 0; x < this.mapTileSize.x; x++) {
				row1.push(0);
				row2.push(1);
			}
			this.mapTiles[y] = row1;
			this.collisionTiles[y] = row2;
		}

		var digger = new ROT.Map.Digger(this.mapTileSize.x, this.mapTileSize.y, {dugPercentage: 0.8, corridorLength: [1, 3]});

		var digCallback = function(x, y, value) {
			this.collisionTiles[y][x] = value;

			if(value === 0) {
				this.freeTiles.push({x: x, y: y});
				this.mapTiles[y][x] = 1;
			} else {
				this.mapTiles[y][x] = 2;
			}
		};
		digger.create(digCallback.bind(this));

		this._drawMap();
		this._createPlayer();
		this._createEntities();
	},

	_drawMap: function() {
		this.backgroundMaps.push(new ig.BackgroundMap(8, this.mapTiles, 'media/dungeon.png'));
		this.collisionMap = new ig.CollisionMap(8, this.collisionTiles);
	},

	_createPlayer: function() {
		var index = Math.floor(ROT.RNG.getUniform() * this.freeTiles.length);
    var pos = this.freeTiles.splice(index, 1)[0];
		this.player = ig.game.spawnEntity(EntityArcher, pos.x * 8, pos.y * 8);
		this.scheduler.add(this.player, true);
	},

	_createEntities: function () {
		var index, pos, entity;

		for(var i = 0; i < 10; i++) {
			index = Math.floor(ROT.RNG.getUniform() * this.freeTiles.length);
			pos = this.freeTiles.splice(index, 1)[0];
			entity = ig.game.spawnEntity(EntitySkeleton, pos.x * 8, pos.y * 8);
			this.scheduler.add(entity, true);
		}

		// Stairs
		index = Math.floor(ROT.RNG.getUniform() * this.freeTiles.length);
		pos = this.freeTiles.splice(index, 1)[0];
		entity = ig.game.spawnEntity(EntityStairs, pos.x * 8, pos.y * 8);
	},

	passableTile: function(x, y) {
		var row = this.collisionTiles[y];
		var tile = null;

		if(row) {
			tile = row[x];
		}

		if(typeof tile == "undefined") {
			return false;
		} else {
			return tile === 0;
		}
	},

	fovCallback: function(x, y, r, visibility) {
		newX = Math.floor(x * 16);
		newY = Math.floor(y * 16);
		ig.system.context.fillStyle = "rgba(255, 255, 255, 0.1)";
		ig.system.context.fillRect(newX, newY, 16, 16);

		// Mark tile as visited
		tile = x + ',' + y;
		this.visitedTiles[tile] = true;
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

			// The current tile
			posX = Math.floor(this.player.pos.x / 8);
			posY = Math.floor(this.player.pos.y / 8);
			//console.log(posX + ', ' + posY);

			//Compute visibility
			this.fov.compute(posX, posY, 7, _.bind(this.fovCallback, this));

		}
		this.drawLog();
		this.drawFog();

		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;

		//this.font.draw( 'LEFT AXE', x, 20, ig.Font.ALIGN.CENTER );
		//this.font.draw( 'An online roguelike. Coming soon...', x, 40, ig.Font.ALIGN.CENTER );
	},

	drawHealth: function() {
		this.font.draw( 'HP: ' + this.player.health + '/' + this.player.maxHealth , 5, 240);
	},

	drawExperience: function() {
		this.font.draw( 'XP: ' + this.player.experience, 5, 248);
	},

	drawFog: function() {
		for (var x = 0; x < 40; x++) {
			for (var y = 0; y < 30; y++) {
				key = x + ',' + y;

				if(this.visitedTiles[key]) {
					// Do nothing
				} else {
					newX = Math.floor(x * 16);
					newY = Math.floor(y * 16);
					ig.system.context.fillStyle = "rgba(0, 0, 0, 1)";
					ig.system.context.fillRect(newX, newY, 16, 16);
				}
			}
		}
	},

	drawLog: function() {
		var x = 80;
		var y = 240;
		var entriesToShow = this.log.length >= 2 ? 2 : this.log.length;

		for (var i = entriesToShow; i > 0; i--) {
			var entry = this.log[this.log.length - i];
			if (entry) {
				this.font.draw(entry, x, y);
				//this.display.drawText(0, 0, entry);
				y += 10;
			}
		}
	}
});


// Start the Game with 60fps, a resolution of 320x240
ig.main( '#canvas', LeftAxe, 60, 320, 260, 2);

});
