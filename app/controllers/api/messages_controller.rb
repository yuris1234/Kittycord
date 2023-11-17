class Api::MessagesController < ApplicationController

    # def update
    #     @message = Message.find_by(id: params[:id])
    #     if @message.update(message_params)
    #         render 
    # end

    def create
        @message = Message.create(message_params)
        if @message.save
            # render :show, locals: { message: @message }
            # DmsChannel.broadcast_to @message.messageable , 
            #     from_template('api/messages/show',  {message: @message})
            # render :show, locals: { message: @message }
            render :show
            DmsChannel.broadcast_to(@message.messageable, @message)
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
