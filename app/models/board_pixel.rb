class BoardPixel < ApplicationRecord
  include ExtractCords

  validates :email, presence: true, uniqueness: true
  enum status: { pending: 0, live: 1 }

  mount_uploader :image, ImageUploader

  before_save :set_reserved_pixels_on_board

  private

  def set_reserved_pixels_on_board
    pixels = extract_cords(width: self.width, height: self.height, side_x: self.side_x, top_y: self.top_y)
    self.reserved_pixels = pixels.to_json
  end
end
