class MembershipJoin < ApplicationRecord
    belongs_to :user 

    belongs_to :membership, polymorphic: true
end