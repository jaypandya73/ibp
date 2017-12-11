class Api::V1::ReservedPixelsController < ApplicationController
  DEAFAULT_PIXEL = 20

  def reserve_pixels
    create_pixels = BoardPixel.new(board_params)
    if create_pixels.save
      render json: { message: "Successfully created." }, status: 200
    else
      render json: { message: "Something went wrong." }, status: 400
    end
  end

  def fetch_reserved_images
    images_url = BoardPixel.live.each_with_object({}) { |b, h| h[b.image_url] = { width: b.width, height: b.height, side_x: b.side_x, top_y: b.top_y } }
    render json: { images: images_url }
  end

  def reserved_pixels
    pixels = BoardPixel.live.pluck(:reserved_pixels).map { |p| JSON.parse(p) }
    render json: { reserved_pixels: pixels.flatten(1) }
  end

  private

  def board_params
    params.require(:board).permit(:email, :width, :height, :side_x, :top_y)
  end

end
