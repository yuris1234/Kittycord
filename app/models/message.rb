# == Schema Information
#
# Table name: messages
#
#  id               :bigint           not null, primary key
#  body             :string           not null
#  author_id        :bigint           not null
#  messageable_type :string
#  messageable_id   :bigint
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#
class Message < ApplicationRecord
    validates :body, :author_id, presence: true

    belongs_to :author, class_name: :User
    belongs_to :messageable, polymorphic: true
end
