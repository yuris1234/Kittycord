class Friend < ApplicationRecord
    validates :friend_1, :friend_2, presence: true
    validates :friend_1, uniqueness: {scope: :friend_2}

    belongs_to :user_1, class_name: :User, foreign_key: :friend_1
    belongs_to :user_2, class_name: :User, foreign_key: :friend_2
end