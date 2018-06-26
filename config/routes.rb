Rails.application.routes.draw do


  resources :domains, only: [:index, :create]
  
  post 'auth' => 'authentication#get_token'
  post 'signup' => 'authentication#sign_up'
  delete 'auth' => 'authentication#sign_out'
      
 
  #render index.html page in public which is our react app!
  get '*path', to: redirect('/')

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
