class JsonWebToken
  def self.encode(payload, secret_key =  Rails.application.secrets.secret_key_base )
    JWT.encode(payload, secret_key)
  end

  def self.decode(token)
    return HashWithIndifferentAccess.new(JWT.decode(token, Rails.application.secrets.secret_key_base)[0])
  rescue
    nil
  end
end