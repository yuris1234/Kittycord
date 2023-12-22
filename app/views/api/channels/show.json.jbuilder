messages = @channel.messages.pluck(:id)

json.channel do 
    json.extract! @channel, :id, :server_id, :name
    json.messages messages
end

json.messages do 
    @channel.messages.each do |message|
        json.set! message.id do
            json.extract! message, :id, :body, :author_id, :messageable_type, :messageable_id, :created_at, :updated_at
        end
    end
end

