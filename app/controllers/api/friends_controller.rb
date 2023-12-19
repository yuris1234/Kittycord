class Api::FriendsController < ApplicationController
    def index
        @friends = Friend.all
        render :index
    end

    def show
        @friend = Friend.find(params[:id])
        
        if @friend
            render :show
        else
            render json: {errors: 'Friendship not found'}
        end
    end

    def create
        @friend = Friend.new(friend_params)

        if @friend.save
            render :show
        else
            render json: {errors: @friend.errors.full_messages }
        end
    end

    def destroy
        friend = Friend.find(params[:id])

        if friend
            friend.destroy
            render json: {message: 'Friend successfully deleted'}
        else
            render json: {errors: friend.errors.full_messages }
        end
    end

    private
    def friend_params
        params.require(:friend).permit(:friend_1, :friend_2)
    end
end