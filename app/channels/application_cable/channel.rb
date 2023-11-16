module ApplicationCable
  class Channel < ActionCable::Channel::Base
    def subscribed
      stream_for Room.find_by(id: params[:id])
    end
  end
end
