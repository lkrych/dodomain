class  Api::v1::AuthenticationController < Api::v1::BaseController
  before_action :authenticate_request!, only: :sign_out

  def get_token
    email = params[:email]
    user = User.where(email: email).first
    if(user.nil?)
      return send_error('Email was not found')
    end
    
    if user.match_password?(params[:password])
      return send_token(user, type)
    else
      send_error('Incorrect Password')
    end
  end
end

def sign_up
  email = params[:email]
  user = User.where(email: email).first
  if user.sign_in_count > 0
    return send_error('This email has already been used')
  end
  user.password = params[:password]
  user.save
  send_token(user, type)
end

def sign_out
  render json: {auth_token: ''}
end

private

def send_token(user, type)
  render json: payload(user, type)
end

def send_error(message)
  render json: {errors: [message]}, status: :unauthorized
end

def payload(user, type)
  return nil unless user and user.id
  {
    auth_token: JsonWebToken.encode({
      user_id: user.id,
    })
  }
end
end