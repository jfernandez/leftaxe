# http://roguebasin.roguelikedevelopment.org/index.php?title=Dungeon-Building_Algorithm

class Dungeon
  BLANK_TILE = 0
  FLOOR_TILE = 1
  WALL_TILE = 2

  attr_reader :map_width, :map_height, :max_features, :room_chance

  def initialize(map_width, map_height, max_features, room_chance)
    @map_width, @map_height = map_width, map_height
    @max_features = max_features
    @room_chance = room_chance
    @tiles = []

    fill_map

    # Dig out a single room in the center of the map
    x = map_width / 2
    y = map_height / 2
    make_room(x, y, 4, 4)
  end

  def draw
    for row in tiles
      puts row.join(" ")
    end
    return nil
  end

  def blank_tile?(x, y)
    get_tile(x, y) == BLANK_TILE
  end

  def set_wall_tile(x, y)
    set_tile(x, y, WALL_TILE)
  end

  def set_floor_tile(x, y)
    set_tile(x, y, FLOOR_TILE)
  end

  private

  attr_reader :tiles

  def get_tile(x, y)
    tiles[y][x]
  end

  def set_tile(x, y, tile)
    tiles[y][x] = tile
  end

  def fill_map
    map_height.times do
      tiles << Array.new(map_width, BLANK_TILE)
    end
  end

  def make_room(x, y, width, height)
    room = Room.new(x, y, width, height, self)
    room.build
  end

end

class Room
  attr_reader :x, :y, :xlen, :ylen, :width, :height, :dungeon

  def initialize(x, y, width, height, dungeon)
    @x, @y = x, y
    @xlen = rand(4..width)
    @ylen = rand(4..height)
    @width, @height, @dungeon = width, height, dungeon
  end

  def build
    return false unless enough_space?

    ytemp = y
    while ytemp > (y - ylen)
      xtemp = x - xlen / 2
      while xtemp < (x + (xlen + 1) / 2)
        # Start with walls
        if xtemp == (x - xlen / 2)
          dungeon.set_wall_tile(xtemp, ytemp)
        elsif xtemp == (x + (xlen - 1) / 2)
          dungeon.set_wall_tile(xtemp, ytemp)
        elsif ytemp == y
          dungeon.set_wall_tile(xtemp, ytemp)
        elsif ytemp == (y - ylen + 1)
          dungeon.set_wall_tile(xtemp, ytemp)
        else
          dungeon.set_floor_tile(xtemp, ytemp)
        end
        xtemp += 1
      end
      ytemp -= 1
    end

    true
  end

  private

  def enough_space?
    ytemp = y
    while ytemp > (y - ylen)
      return false if ytemp < 0 || ytemp > dungeon.map_height

      xtemp = x - xlen / 2
      while xtemp < (x + (xlen + 1) / 2)
        return false if xtemp < 0 || xtemp > dungeon.map_width
        return false unless dungeon.blank_tile?(xtemp, ytemp)
        xtemp += 1
      end

      ytemp -= 1
    end
    true
  end
end

#d = Dungeon.new(30, 30, nil, nil)
#d.draw