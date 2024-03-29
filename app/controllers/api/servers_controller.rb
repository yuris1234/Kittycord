class Api::ServersController < ApplicationController

    def create
        @server = Server.new(server_params)
        if @server.save
            channel = Channel.new(server_id: @server.id);
            if channel.save
                render :show
            end
        else
            render json: {errors: @server.errors.full_messages}
        end
    end

    def show
        @server = Server.find(params[:id])
        if @server
            render :show
        else
            render json: {errors: @server.errors.full_messages}
        end
    end

    private
    def server_params
        params.require(:server).permit(:owner_id, :name)
    end

end