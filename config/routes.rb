Rails.application.routes.draw do


  resources :users, only: [:new, :create]
  resources :domains, only: [:index, :create]
  
  post 'auth' => 'authentication#get_token'
  post 'signup' => 'authentication#sign_up'
  delete 'auth' => 'authentication#sign_out'
      
 

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
