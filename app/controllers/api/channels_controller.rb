class Api::ChannelsController < ApplicationController

    def create
        @channel = Channel.new(channel_params)
        if @channel.save
            render :show
        else
            render json: {errors: @channel.errors.full_messages}
        end
    end

    def destroy

    end

    def show
        @channel = Channel.find(params[:id])
        if @channel
            render :show
        else
            render json: {errors: @channel.errors.full_messages}
        end
    end

    private
    def channel_params
        params.require(:channel).permit(:name, :server_id)
    end

end