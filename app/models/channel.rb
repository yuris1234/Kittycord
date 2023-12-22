# == Schema Information
#
# Table name: channels
#
#  id         :bigint           not null, primary key
#  server_id  :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  name       :string           default("general")
#
class Channel < ApplicationRecord
    has_many :messages, as: :messageable, dependent: :destroy
    belongs_to :server
    has_many :members, through: :server, source: :members
end
