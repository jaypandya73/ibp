class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  private

  def after_sign_in_path_for(resource)
    stored_location_for(resource) ||
    if resource.is_a?(Admin)
      admin_clients_path
    else
      super
    end
  end

  def after_sign_out_path_for(resource_or_scope)
    if resource_or_scope == :admin
      admin_sign_in_path
    else
      root_path
    end
  end

end
