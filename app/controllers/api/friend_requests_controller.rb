class Api::FriendRequestsController < ApplicationController
    def index
        @friend_requests = FriendRequest.all
        render :index
    end

    def show
        @friend_request = FriendRequest.find(params[:id])
        @friender = User.find_by(@friend_request[:friender]);
        @friended = User.find_by(@friend_request[:friended]);
        
        if @friend_request && @friender && @friended 
            render :show
        else
            render json: {errors: 'Friend request not found'}
        end
    end

    def update
        @friend_request = FriendRequest.find(params[:id])
        @friender = User.find_by(@friend_request[:friender]);
        @friended = User.find_by(@friend_request[:friended]);

        if @friend_request.update(friend_params)
            render :show
        else 
            render json: {errors: @friend_request.errors.full_messages}
        end
    end

    def create
        @friend_request = FriendRequest.new(friend_params)
        @friender = User.find_by(@friend_request[:friender]);
        @friended = User.find_by(@friend_request[:friended]);

        if @friend_request.save
            render :show
        else
            render json: {errors: @friend.errors.full_messages }
        end
    end

    def destroy
        friend_request = FriendRequest.find(params[:id])

        if friend_request.destroy
            render json: {message: 'Friend request successfully deleted'}
        else
            render json: {errors: friend_request.errors.full_messages }
        end
    end

    private
    def friend_request_params
        params.require(:friend_request).permit(:friender, :friended, :status)
    end
end