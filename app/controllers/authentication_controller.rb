class AuthenticationController < ApplicationController
  before_action :authenticate_request!, only: :sign_out

  def get_token #acts as a sign in method
    email = user_params[:email]
    user = User.where(email: email).first
    if(user.nil?)
      return send_error('There is no account associated with this email')
    end
    
    if user.match_password(user_params[:password])
      return send_token(user)
    else
      send_error('Incorrect Password')
    end
  end


  def sign_up 
    email = user_params[:email]
    user = User.where(email: email).first
    if user
      return send_error('An account has already been created with this email')
    end

    user = User.new(user_params)
    begin 
      user.save
      send_token(user)
    rescue => e #return an error if there is an error
      send_error(e)
    end
  end
    
  def sign_out
    render json: {auth_token: ''}
  end

  private

  #use strong params to prevent anyone from sending in malicious attributes
  def user_params
    params.require(:user).permit(:email, :password)
  end

  def send_token(user)
    render json: payload(user)
  end

  def send_error(message)
    render json: {session_errors: message}, status: :unauthorized
  end

  def payload(user)
    return nil unless user and user.id
    exp = Time.now.to_i + 24 * 3600 #set expiration to one day
    {
      auth_token: JsonWebToken.encode({
        user_id: user.id,
        exp: exp 
      })
    }
  end
end