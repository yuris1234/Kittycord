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

sentFriendRequestsArray = []
@user.sent_friend_requests.each do |friend_request|
  sentFriendRequestsArray << friend_request.id
end

receivedFriendRequestsArray = []
@user.received_friend_requests.each do |friend_request|
  receivedFriendRequestsArray << friend_request.id
end


json.users do
  json.set! @user.id do 
    json.extract! @user, :id, :email, :username, :status, :pfp_url
    json.friendIds friendsArray
    json.sentFriendRequests sentFriendRequestsArray
    json.receivedFriendRequests receivedFriendRequestsArray
  end
  @user.friends1.each do |friend|
    json.set! friend.id do 
      json.extract! friend, :id, :email, :username, :status, :pfp_url
    end 
  end
  @user.friends2.each do |friend|
    json.set! friend.id do
      json.extract! friend, :id, :email, :username, :status, :pfp_url
    end
  end
  @user.dms.each do |dm|
    dm.members.each do |member|
      json.set! member.id do
        json.extract! member, :id, :email, :username, :status, :pfp_url
      end
    end
  end
  @user.sent_friend_requests.each do |request|
    friended = User.find(request.friended)
    json.set! friended.id do
      json.extract! friended, :id, :email, :username, :status, :pfp_url
    end
  end
  @user.received_friend_requests.each do |request|
    friender = User.find(request.friender)
    json.set! friender.id do
      json.extract! friender, :id, :email, :username, :status, :pfp_url
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

json.friendRequests do
  @user.sent_friend_requests.each do |request|
    json.set! request.id do 
      json.extract! request, :id, :friender, :friended, :status
    end
  end
  @user.received_friend_requests.each do |request|
    json.set! request.id do
      json.extract! request, :id, :friender, :friended, :status
    end
  end
end