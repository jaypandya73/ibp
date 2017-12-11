module ExtractCords
  extend ActiveSupport::Concern
  DEAFAULT_PIXEL = 20

  def extract_cords(width: 20, height: 20, side_x: 0, top_y: 0)
    initial_x = 0
    wt = width / DEAFAULT_PIXEL
    ht = height / DEAFAULT_PIXEL
    (0...wt).each_with_object([]) do |_i, arr|
      reserved_x = side_x + initial_x
      initial_x += DEAFAULT_PIXEL
      initial_y = 0
      (0...ht).each do |_j|
        reserved_y = top_y + initial_y
        arr << [reserved_x, reserved_y]
        initial_y += DEAFAULT_PIXEL
      end
    end
  end

end
