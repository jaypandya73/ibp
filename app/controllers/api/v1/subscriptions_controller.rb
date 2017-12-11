class Api::V1::SubscriptionsController < ApplicationController

  def create
    subscription = Subscription.new(subscription_params)
    if subscription.save
      render json: { msg: "Subscribed successfully." }, status: 200
    else
      render json: { msg: "Subscription failed. Try again later" }, status: 400
    end

  end

  private

  def subscription_params
    params.require(:subscription).permit(:email, :name)
  end

end
