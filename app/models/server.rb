class Server < ApplicationRecord
    has_many :channels
    has_many :membership_joins, as: :membership
    has_many :messages, through: :channels, source: :messages
    has_many :members, through: :membership_joins, source: :user
end