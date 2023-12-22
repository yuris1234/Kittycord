channels = @server.channels.pluck(:id)
members = @server.members.pluck(:id)

json.server do
    json.extract! @server, :id, :owner_id, :name
    json.channels channels
    json.members members
end

json.channels do 
    @server.channels.each do |channel|
        json.set! channel.id do
            json.extract! channel, :id, :server_id, :name
        end
    end
end