Rails.application.routes.draw do

  get '/faqs', to: 'faqs#index', as: :faqs_path

  root to: 'home#index'

  namespace :admin do
    resources :clients, only: [:index, :edit]
    put '/clients/:id', to: 'clients#update', as: :update_client
  end

  # API routes
  namespace :api, :path => '/api' do
    namespace :v1 do
      get 'board/pixels', to: 'reserved_pixels#reserved_pixels'
      get '/board/fetch_reserved_images', to: 'reserved_pixels#fetch_reserved_images'
      post 'board/reserve_pixels', to:'reserved_pixels#reserve_pixels'

      post '/subscribe', to: 'subscriptions#create', as: :subscribe_email
    end
  end

  devise_for :admins
  devise_scope :admin do
    get 'admin/sign_in', to: 'devise/sessions#new'
  end

end
