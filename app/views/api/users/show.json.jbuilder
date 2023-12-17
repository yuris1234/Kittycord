friendsArray = []
@user.friends1.each do |friend|
  friendsArray << friend.id 
end
@user.friends2.each do |friend|
  friendsArray << friend.id 
end

dmsArray = []
@user.dms.each do |dm|
  dmsArray << dm.id 
end

json.users do
  json.set! @user.id do 
    json.extract! @user, :id, :email, :username
    json.friendIds friendsArray
    json.dmIds dmsArray
  end
  @user.friends1.each do |friend|
    json.set! friend.id do 
      json.extract! friend, :id, :email, :username
    end 
  end
  @user.friends2.each do |friend|
    json.set! friend.id do
      json.extract! friend, :id, :email, :username
    end
  end
  @user.dms.each do |dm|
    dm.members.each do |member|
      json.set! member.id do
        json.extract! member, :id, :email, :username
      end
    end
  end
end

json.dms do 
  @user.dms.each do |dm|
    members = dm.members.map {|member| member.id}
    json.set! dm.id do 
      json.extract! dm, :id
      json.members members
    end
  end
end
