class AuthenticationController < ApplicationController
  before_action :authenticate_request!, only: :sign_out

  def get_token
    email = params[:email]
    user = User.where(email: email).first
    if(user.nil?)
      return send_error('Email was not found')
    end
    
    if user.match_password(params[:password])
      return send_token(user)
    else
      send_error('Incorrect Password')
    end
  end


  def sign_up
    email = params[:email]
    user = User.where(email: email).first
    if user
      return send_error('This email has already been used')
    end
    user.password = params[:password]
    user.save
    send_token(user)
  end

  def sign_out
    render json: {auth_token: ''}
  end

  private

  def send_token(user)
    render json: payload(user)
  end

  def send_error(message)
    render json: {errors: [message]}, status: :unauthorized
  end

  def payload(user)
    return nil unless user and user.id
    {
      auth_token: JsonWebToken.encode({
        user_id: user.id,
      })
    }
  end
end