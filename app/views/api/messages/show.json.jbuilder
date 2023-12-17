
json.message do
  json.extract! @message, :id, :body, :author_id, :messageable_type, :messageable_id, :created_at, :updated_at
end

author = User.find(@message.author)

json.user do 
  json.extract! author, :id, :email, :username, :status, :pfp_url
end