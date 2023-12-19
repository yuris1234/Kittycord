
json.user do 
    json.extract! @user, :id, :email, :username, :pfp_url, :status, :created_at, :updated_at
end

