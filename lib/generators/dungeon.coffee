class Dungeon
  BLANK_TILE = 0
  FLOOR_TILE = 1
  WALL_TILE  = 2

  constructor: (@map_width, @map_height, @max_features, @room_chance) ->
    @tiles = []
    @fill_map()

  fill_map: () ->
    for y in [1..@map_height]
      row = []
      for x in [1..@map_width]
        row.push(BLANK_TILE)
      @tiles.push(row)


