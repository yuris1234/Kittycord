json.membership_join do
    json.extract! @membership_join, :id, :user_id, :membership_type, :membership_id
end