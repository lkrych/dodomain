class Domain < ApplicationRecord
  require 'socket'
  
  belongs_to :user

  def self.search(query)
    where("name LIKE ? ", "%#{query}%")
  end

  def parse_domain
    begin
      uri = URI.parse(name) #use ruby stdlib to create URI
      domain = PublicSuffix.parse(uri.host) #uses PublicSuffixList https://publicsuffix.org/
      self.name = domain.domain
    rescue
      raise "Not a valid domain!"
    end
  end

  def check_if_valid_domain #make request to DNS Lookup API
    begin
      IPSocket::getaddress(name)
      return true
    rescue
      return false
    end
  end
end
