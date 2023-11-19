class Api::MessagesController < ApplicationController

    # def update
    #     @message = Message.find_by(id: params[:id])
    #     if @message.update(message_params)
    #         render 
    # end

    def create
        @message = Message.new(message_params)
        if @message.save
            DmsChannel.broadcast_to @message.messageable, @message
                # from_template('api/messages/show',  {message: @message})
            # debugger
            JSON.parse(render :show)
            # render json: nil, status: :ok
        else
            render json: {errors: ['Unable to save message']}
        end
    end

    def destroy

    end

    private
    def message_params
        params.require(:message).permit(:body,  :messageable_type, :messageable_id, :author_id)
    end
end
