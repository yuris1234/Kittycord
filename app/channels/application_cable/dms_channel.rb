class DmsChannel < ApplicationCable::Channel 
    def subscribed
        @dm = Dm.find_by(id: params[:id])
        stream_for @dm
    end
end