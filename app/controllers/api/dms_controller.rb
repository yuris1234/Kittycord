class Api::DmsController < ApplicationController
    def index
        @dms = Dm.all 
        render :index
    end

    def show
        @dm = Dm.find_by(id: params[:id])
        if @dm
            render :show
        else
            render json: {errors: ['Dm not found']}
        end
    end

    def index

    end
end