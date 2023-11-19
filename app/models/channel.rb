class Channel < ApplicationRecord
    has_many :messages, as: :messageable
    # has_many :membership_joins, through: server, source: 
    belongs_to :server
    has_many :members, through: :server, source: :members
end