class FaqsController < ApplicationController
  def index
    @total_reserved_pxls_board = BoardPixel.pluck(:reserved_pixels).map {|b| JSON.parse(b)}.flatten(1).count
  end
end
