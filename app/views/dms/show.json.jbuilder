messages = @dm.messages.pluck(:id)

json.dm do 
    json.extract! @dm, :id 
    json.messages messages
end

json.messages do 
    @dm.messages.each do |message|
        json.set! message.id do
            json.extract! message, :id, :body, :author_id, :messageable_type, :messageable_id
        end
    end
end