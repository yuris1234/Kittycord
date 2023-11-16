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

  has_many :membership_joins
  has_many :dms, through: :membership_joins, source_type: "Dm", source: :membership
  has_many :messages, foreign_key: :author_id, inverse_of: :author

  def self.find_by_credentials(credential, password) 
    field = credential =~ URI::MailTo::EMAIL_REGEXP ? :email : :username
    # debugger
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
