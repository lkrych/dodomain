class User < ApplicationRecord
  #add some validations
  attr_accessible :email, :password, :password_confirmation
  attr_accessor :password
  EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  validates :email, :presence => true, :uniqueness => true, :format => EMAIL_REGEX
  validates :password, :confirmation => true #password_confirmation attr
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

  def self.authenticate(email="", login_password="")
    if  EMAIL_REGEX.match(email)    
      user = User.find_by_email(email)
    else
      user = User.find_by_username(email)
    end
    if user && user.match_password(login_password)
      return user
    else
      return false
    end
  end   
  
  def match_password(login_password="")
    encrypted_password == BCrypt::Engine.hash_secret(login_password, salt)
  end
end
