json.user do
  json.extract! @user, :id, :email, :username
end

json.dms do 
  @user.dms.each do |dm|
    memberArray = []
    messageArray = []
    json.set! dm.id do 
      json.extract! dm, :id
      dm.members.each do |member|
        if @user.username != member.username
          memberArray << member.username
        end
      end
      json.members memberArray
      dm.messages.each do |message|
        messageArray << message.id 
      end
      json.messages messageArray
    end
  end
end