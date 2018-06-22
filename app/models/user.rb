class User < ApplicationRecord
  #add association
  has_many :domains, dependent: :destroy

  #add some validations
  attr_accessor :password
  EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, :presence => true, :uniqueness => true, :format => EMAIL_REGEX
  validates_length_of :password, :in => 6..20, :on => :create
  
  #add some callbacks
  before_save :encrypt_password
  after_save :clear_password

  def encrypt_password #add encrypted password to user object
    if password.present?
      self.salt = BCrypt::Engine.generate_salt
      self.password_digest= BCrypt::Engine.hash_secret(password, salt)
    end
  end

  def clear_password #remove password from user object
    self.password = nil
  end

  def match_password(login_password="")
    self.password_digest == BCrypt::Engine.hash_secret(login_password, salt)
  end
end
