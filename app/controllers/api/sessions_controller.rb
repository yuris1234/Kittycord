class Api::SessionsController < ApplicationController
  def show
    # banana
    if current_user
      @user = current_user
      render :show
    else
      render json: {user: nil}
    end
  end

  def create
    credential = params[:credential]
    password = params[:password]
    @user = User.find_by_credentials(credential, password)
    if @user
      login!(@user)
      render :show
    else
      render json: {errors: ['The provided credentials were invalid']}, status: :unauthorized
    end
  end

  def destroy
    if current_user
      logout!
      render json: {message: 'success'}
    end
  end
end
