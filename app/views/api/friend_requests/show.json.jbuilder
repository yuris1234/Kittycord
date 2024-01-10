json.friend_request do
    json.extract! @friend_request, :id, :friended, :friender, :status
end