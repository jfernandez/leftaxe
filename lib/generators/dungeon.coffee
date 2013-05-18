# http://roguebasin.roguelikedevelopment.org/index.php?title=Dungeon-Building_Algorithm

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
    @make_room(x, y, 5, 5)

  fill_map: ->
    for y in [1..@map_height]
      row = []
      for x in [1..@map_width]
        row.push(BLANK_TILE)
      @tiles.push(row)

  make_room: (x, y, width, height) ->
    room = new Room(x, y, width, height, Math.floor((Math.random() * 1) + 1), this)
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
  constructor: (@x, @y, @width, @height, @direction, @dungeon) ->
    @xlen = Math.floor((Math.random() * @width) + 4);
    @ylen = Math.floor((Math.random() * @height) + 4);
    @dir = 0
    @dir = @direction if @direction > 0 && @direction < 4

  build: ->
    if @dir == 0 && @has_enough_space_north()
      @build_north()

    else if @dir == 1 && @has_enough_space_east()
      @build_east()

    else if @dir == 2 && @has_enough_space_south()
      @build_south()

    else if @dir == 3 && @has_enough_space_west()
      @build_west()

    else
      false

  has_enough_space_north: ->
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

  build_north: ->
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

  has_enough_space_east: ->
    ytemp = (@y - Math.floor(@ylen / 2))
    while ytemp < (@y + Math.floor((@ylen + 1) / 2))
      return false if ytemp < 0 || ytemp > @dungeon.map_height

      xtemp = @x
      while xtemp < @x + @xlen
        return false if xtemp < 0 || xtemp > @dungeon.map_width
        return false unless @dungeon.is_blank_tile(xtemp, ytemp)
        xtemp += 1
      ytemp += 1
    true

  build_east: ->
    ytemp = (@y - Math.floor(@ylen / 2))
    while ytemp < (@y + Math.floor((@ylen + 1) / 2))
      xtemp = @x
      while xtemp < @x + @xlen
        if xtemp == @x
          @dungeon.set_wall_tile(xtemp, ytemp)
        else if xtemp == @x + @xlen - 1
          @dungeon.set_wall_tile(xtemp, ytemp)
        else if ytemp == @y - Math.floor(@ylen / 2)
          @dungeon.set_wall_tile(xtemp, ytemp)
        else if ytemp == @y + Math.floor((@ylen - 1) / 2)
          @dungeon.set_wall_tile(xtemp, ytemp)
        else
          @dungeon.set_floor_tile(xtemp, ytemp)
        xtemp +=1
      ytemp +=1


  has_enough_space_south: ->
    ytemp = @y
    while ytemp < @y + @ylen
      return false if ytemp < 0 || ytemp > @dungeon.map_height

      xtemp = @x - Math.floor(@xlen / 2)
      while xtemp < @x + Math.floor((@xlen + 1) / 2)
        return false if xtemp < 0 || xtemp > @dungeon.map_width
        return false unless @dungeon.is_blank_tile(xtemp, ytemp)
        xtemp += 1
      ytemp += 1
    true

  has_enough_space_west: ->
    ytemp = @y - Math.floor(@ylen / 2)
    while ytemp < @y + Math.floor((@ylen + 1) / 2)
      return false if ytemp < 0 || ytemp > @dungeon.map_height

      xtemp = @x
      while xtemp > @x - @xlen
        return false if xtemp < 0 || xtemp > @dungeon.map_width
        return false unless @dungeon.is_blank_tile(xtemp, ytemp)
        xtemp -= 1
      ytemp += 1
    true
