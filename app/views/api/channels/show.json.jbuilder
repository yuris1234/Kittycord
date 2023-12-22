messages = @channel.messages.pluck(:id)

json.dm do 
    json.extract! @channel, :id, :server_id, :name
    json.messages messages
end

json.messages do 
    @dm.messages.each do |message|
        json.set! message.id do
            json.extract! message, :id, :body, :author_id, :messageable_type, :messageable_id, :created_at, :updated_at
        end
    end
end

