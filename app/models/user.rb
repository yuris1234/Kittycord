# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  status          :string           default("offline"), not null
#  pfp_url         :string           default("/unknown.png")
#
class User < ApplicationRecord
  has_secure_password
  validates :username, 
    uniqueness: true,
    length: { in: 3..30 },
    format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
  validates :email, 
    uniqueness: true, 
    length: { in: 3..255 }, 
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..255 }, allow_nil: true
  validates :pfp_url, presence: true
  validates :status, presence: true, inclusion: {in: %w(offline online idle)}

  before_validation :ensure_session_token

  has_many :membership_joins, dependent: :destroy
  has_many :dms, through: :membership_joins, source_type: "Dm", source: :membership
  has_many :messages, foreign_key: :author_id, inverse_of: :author, dependent: :destroy
  has_many :owned_servers, class_name: :Server, foreign_key: :owner_id, dependent: :destroy
  has_many :servers, through: :membership_joins, source_type: "Server", source: :membership
  has_many :channels, through: :servers


  has_many :friendships1, foreign_key: :friend_1, class_name: :Friend, dependent: :destroy
  has_many :friendships2, foreign_key: :friend_2, class_name: :Friend, dependent: :destroy
  
  has_many :friends1, through: :friendships1, source: :user_2
  has_many :friends2, through: :friendships2, source: :user_1

  has_many :sent_friend_requests, foreign_key: :friender, class_name: :FriendRequest, dependent: :destroy
  has_many :received_friend_requests, foreign_key: :friended, class_name: :FriendRequest, dependent: :destroy

  def self.find_by_credentials(credential, password) 
    field = credential =~ URI::MailTo::EMAIL_REGEXP ? :email : :username
    user = User.find_by(field => credential)
    if user&.authenticate(password)
      return user
    else
      return nil
    end

  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end

  private

  def generate_unique_session_token
    loop do
      token = SecureRandom.base64 
      return token if !User.exists?(session_token: token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end
