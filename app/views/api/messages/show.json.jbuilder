json.message do
  json.extract! @message, :id, :body, :author_id
end