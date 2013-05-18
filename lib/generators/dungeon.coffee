class Dungeon
  BLANK_TILE = 0
  FLOOR_TILE = 1
  WALL_TILE  = 2

  constructor: (@map_width, @map_height, @max_features, @room_chance) ->
    @tiles = []
    @fill_map()

    # Dig out a single room in the center of the map
    x = Math.floor(@map_width / 2)
    y = Math.floor(@map_height / 2)
    @make_room(x, y, 4, 4)

  fill_map: ->
    for y in [1..@map_height]
      row = []
      for x in [1..@map_width]
        row.push(BLANK_TILE)
      @tiles.push(row)

  make_room: (x, y, width, height) ->
    room = new Room(x, y, width, height, this)
    room.build()

  get_tile: (x, y) ->
    @tiles[y][x]

  set_tile: (x, y, tile) ->
    @tiles[y][x] = tile

  is_blank_tile: (x, y) ->
    @get_tile(x, y) == BLANK_TILE

  set_wall_tile: (x, y) ->
    @set_tile(x, y, WALL_TILE)

  set_floor_tile: (x, y) ->
    @set_tile(x, y, FLOOR_TILE)

class Room
  constructor: (@x, @y, @width, @height, @dungeon) ->
    @xlen = Math.floor((Math.random() * @width) + 4);
    @ylen = Math.floor((Math.random() * @height) + 4);
    console.log(@xlen)
    console.log(@ylen)

  build: ->
    return false unless @has_enough_space()

    ytemp = @y
    while ytemp > (@y - @ylen)
      xtemp = @x - Math.floor(@xlen / 2)
      while xtemp < (@x + Math.floor((@xlen + 1) / 2))
        # Start with walls
        if xtemp == (@x - Math.floor(@xlen / 2))
          @dungeon.set_wall_tile(xtemp, ytemp)
        else if xtemp == (@x + Math.floor((@xlen - 1) / 2))
          @dungeon.set_wall_tile(xtemp, ytemp)
        else if ytemp == @y
          @dungeon.set_wall_tile(xtemp, ytemp)
        else if ytemp == (@y - @ylen + 1)
          @dungeon.set_wall_tile(xtemp, ytemp)
        else
          @dungeon.set_floor_tile(xtemp, ytemp)
        xtemp += 1
      ytemp -= 1

    true

  has_enough_space: ->
    ytemp = @y
    while ytemp > (@y - @ylen)
      return false if ytemp < 0 || ytemp > @dungeon.map_height

      xtemp = @x - Math.floor(@xlen / 2)
      while xtemp < (@x + Math.floor((@xlen + 1) / 2))
        return false if xtemp < 0 || xtemp > @dungeon.map_width
        return false unless @dungeon.is_blank_tile(xtemp, ytemp)
        xtemp += 1

      ytemp -= 1
    true

