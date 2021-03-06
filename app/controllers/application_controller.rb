class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception

  protected
  def authenticate_request!
    unless user_id_in_token?
      respond_to do |format|
        format.json { render json: { session_errors: 'Not Authenticated' }, status: :unauthorized }
      end
      return
    end
    @current_user = User.find(auth_token[:user_id])

  end

  private
  def http_token
    if request.headers['Authorization'].present?
      @http_token = request.headers['Authorization'].split(' ').last
    elsif request.params[:token].present?
      @http_token = request.params[:token]
    else
      return false;
    end
  end

  def auth_token
    @auth_token = JsonWebToken.decode(http_token)
  end

  def user_id_in_token?
    begin
      http_token && auth_token && auth_token[:user_id].to_i
    rescue 
      return false
    end
  end
end
