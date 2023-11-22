class Friend < ApplicationRecord
    validates :friender, :friended, presence: true
    validates :friender, uniqueness: {scope: :friended}
    validates :status, inclusion: {in: %w[pending accepted]}, presence: true

    belongs_to :user, class_name: :User, foreign_key: :friender
    belongs_to :user, class_name: :User, foreign_key: :friended
end