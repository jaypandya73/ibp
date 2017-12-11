class Admin::ClientsController < ApplicationController
  before_action :authenticate_admin!

  before_action :set_client, only: [:edit, :update]

  def index
    @reserved_pixels = BoardPixel.order(id: :desc)
  end

  def edit
    
  end

  def update
    params[:board_pixel][:status] = params[:board_pixel][:status].to_i
    if @client.update_attributes(client_params)
      flash[:success] = 'Updated successfully'
      redirect_to admin_clients_path
    else
      flash[:alert] = 'Error occured.'
    end
  end

  private

  def set_client
    @client = BoardPixel.find(params[:id])
  end

  def client_params
    params.require(:board_pixel).permit(:email, :width, :height, :image, :side_x, :top_y, :status)
  end

end
