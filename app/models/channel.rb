class Channel < ApplicationRecord
    has_many :messages, as: :messageable
    has_many :membership_joins, as: :membership
    belongs_to :server
end