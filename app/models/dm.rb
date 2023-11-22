class Dm < ApplicationRecord
    has_many :messages, as: :messageable, dependent: :destroy
    has_many :membership_joins, as: :membership, dependent: :destroy
    has_many :members, through: :membership_joins, source: :user, dependent: :destroy
end