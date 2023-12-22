class Api::ServersController < ApplicationController

    def create
        @server = Server.new(server_params)
        if @server.save
            render :show
        else
            render json: {@server.errors.full_messages}
        end
    end

    def show

    end

    private
    def server_params
        params.require(:server).permit(:owner_id, :name)
    end

end