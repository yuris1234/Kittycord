# == Schema Information
#
# Table name: membership_joins
#
#  id              :bigint           not null, primary key
#  user_id         :bigint           not null
#  membership_type :string           not null
#  membership_id   :bigint           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class MembershipJoin < ApplicationRecord
    belongs_to :user 

    belongs_to :membership, polymorphic: true
end
