# == Schema Information
#
# Table name: dms
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Dm < ApplicationRecord
    has_many :messages, as: :messageable, dependent: :destroy
    has_many :membership_joins, as: :membership, dependent: :destroy
    has_many :members, through: :membership_joins, source: :user, dependent: :destroy
end
