class Api::FriendsController < ApplicationController
    def index
        @friends = Friend.all
        render :index
    end

    def show
        @friendship = Friend.find(params[:id])
        @friender = User.find_by(@frienship[:friender]);
        @friended = User.find_by(@friendship[:friended]);
        
        if @friendship && @friender && @friended 
            render :show
        else
            render json: {errors: 'Friendship status not found'}
        end
    end

    def update
        @friendship = Friend.find(params[:id])
        @friender = User.find_by(@frienship[:friender]);
        @friended = User.find_by(@friendship[:friended]);

        if @friendship.update(friend_params)
            render :show
        else 
            render json: {@friendship.errors.full_messages}, status: 422
        end
    end

    def create
        @friend = Friend.new(friend_params)
        @friender = User.find_by(@frienship[:friender]);
        @friended = User.find_by(@friendship[:friended]);

        if @friend.save
            render :show
        else
            render json: { @friend.errors.full_messages }, status: 422
        end
    end

    def destroy
        friend = Friend.find(params[:id])

        if friend
            friend.destroy
            render json: {message: 'Friend successfully deleted'}
        else
            render json: { friend.errors.full_messages }, status: 422
        end
    end

    private
    def friend_params
        params.require(:friend).permit(:friender, :friended, :status)
    end
end