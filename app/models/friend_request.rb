# == Schema Information
#
# Table name: friend_requests
#
#  id         :bigint           not null, primary key
#  friender   :bigint           not null
#  friended   :bigint           not null
#  status     :string           default("pending"), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class FriendRequest < ApplicationRecord
    before_validation :validate_request
    validates :friender, :friended, presence: true
    validates :friender, uniqueness: {scope: :friended}
    validates :status, inclusion: {in: %w[pending]}, presence: true

    belongs_to :user_1, class_name: :User, foreign_key: :friender
    belongs_to :user_2, class_name: :User, foreign_key: :friended

    def validate_request 
        if self.friender == self.friended 
            errors.add(:base, "Cannot friend yourself")
        elsif (Friend.where([
          "(friend_1 = :friender AND friend_2 = :friended) OR (friend_1 = :friended AND friend_2 = :friender)",
          {friender: self.friender, friended: self.friended}
          ]).length > 0)
            errors.add(:base, 'Already friended')
        else
            return
        end
    end
end
