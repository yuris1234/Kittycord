json.user do
  json.extract! @user, :id, :email, :username
end

json.dms do 
  @user.dms.each do |dm|
    memberArray = []
    json.set! dm.id do 
      json.extract! dm, :id
      dm.members.each do |member|
        memberArray << member.username
      end
      json.members memberArray
    end
  end
end