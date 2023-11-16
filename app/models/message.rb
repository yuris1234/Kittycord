class Message < ApplicationRecord
    validates :body, :author_id, presence: true

    belongs_to :author, class_name: :User
    belongs_to :messageable, polymorphic: true
end