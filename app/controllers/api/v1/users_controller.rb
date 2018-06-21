class Api::v1::UsersController < Api::v1::BaseController
  
  def new
    @user = User.new 
  end

  def create
    @user = User.new(params[:user]) #use params to create user
    begin 
      @user.save #return user if there are no errors
      render json: {
        user: @user, status: :ok
      }
    rescue => e #return an error if there is an error
      render json: {
        error: e, status: :bad_request
      }
    end
  end

end
