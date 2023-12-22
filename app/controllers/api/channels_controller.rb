class Api::ChannelsController < ApplicationController

    def create
        @channel = Channel.new(channel_params)
        if @channel.save
            render :show
        else
            render json: {@channel.errors.full_messages}
        end
    end

    def destroy

    end

    def show

    end

    private
    def channel_params
        params.require(:channel).permit(:name, :server_id)
    end

end