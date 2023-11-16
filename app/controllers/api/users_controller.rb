class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']
  def create
    @user = User.new(user_params)
    # debugger
    if @user.save
      login!(@user)
      render :show
    else
      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end
  end

  def show 
    @user = User.find_by(id: params[:id]);
    if @user 
      render :show 
    else
      render json: {errors: @user.errors.full_messages}
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password)
  end
end
