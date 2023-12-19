messages = @dm.messages.pluck(:id)
members = @dm.members.pluck(:id)

json.dm do 
    json.extract! @dm, :id 
    json.messages messages
    json.members members
end

json.messages do 
    @dm.messages.each do |message|
        json.set! message.id do
            json.extract! message, :id, :body, :author_id, :messageable_type, :messageable_id, :created_at, :updated_at
        end
    end
end

