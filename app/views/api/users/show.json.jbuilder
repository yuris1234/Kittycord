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
  json.extract! @user, :id, :email, :username
  json.friendIds friendsArray
  json.dmIds dmsArray
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
end

json.dms do 
  @user.dms.each do |dm|
    members = dm.members
    members = members.select {|member| member.id != @user.id}  
    json.set! dm.id do 
      json.extract! dm, :id
      json.members members
    end
  end
end
