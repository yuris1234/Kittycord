module ApplicationCable
  class Channel < ActionCable::Channel::Base
    def subscribed
      stream_for Dm.find_by(id: params[:id])
    end
  end
end
