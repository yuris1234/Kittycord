# == Schema Information
#
# Table name: servers
#
#  id         :bigint           not null, primary key
#  owner_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  name       :string           default("server")
#
class Server < ApplicationRecord
    has_many :channels, dependent: :destroy
    has_many :membership_joins, as: :membership, dependent: :destroy
    has_many :messages, through: :channels, source: :messages
    has_many :members, through: :membership_joins, source: :user
end
