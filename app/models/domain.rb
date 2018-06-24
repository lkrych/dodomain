class Domain < ApplicationRecord
  require 'socket'
  
  belongs_to :user

  def self.search(query)
    where("name LIKE ? ", "%#{query}%")
  end

  def parse_domain
    begin
      original_submission = name
      name.gsub!(/https*:\/\// , "")
      self.name = "http://" + self.name
      uri = URI.parse(name) #use ruby stdlib to create URI
      domain = PublicSuffix.parse(uri.host) #uses PublicSuffixList https://publicsuffix.org/
      self.name = domain.domain
    rescue => e
      puts e, e.backtrace
      raise "#{original_submission} is not a valid domain!"
    end
  end

  def check_if_valid_domain #make request to DNS Lookup API
    begin
      IPSocket::getaddress(name)
      return true
    rescue => e
      raise "Could not find an entry in the DNS table for #{name}."
    end
  end
end
