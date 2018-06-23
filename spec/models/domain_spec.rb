require 'rails_helper'

RSpec.describe Domain, type: :model do
  
  context "associations" do 
    context "A user association must exist" do
      it "should not raise a domain has a user" do
        expect { FactoryBot.build(:domain).user }.to_not raise_error    
      end
  
      it "should raise an error if user_id isn't saved to domain" do
        expect { Domain.create!(name: "google.com", description: "some description") }.to raise_error(ActiveRecord::RecordInvalid)   
      end
    end
  end

  context "methods" do
    context "#search" do
      before(:each) do
        FactoryBot.create(:domain)
      end
      it "should find a record if it exists" do
        srch = Domain.search("mydomain")
        expect(srch.count).to be >= 1
      end
  
      it "should not find a record if it doesn't exist" do
        srch = Domain.search("blah")
        expect(srch.count).to be < 1
      end
  
      it "should use fuzzy matching" do 
        srch = Domain.search("domain")
        expect(srch.count).to be >= 1
      end
    end
  
    context "#parse_domain" do
      u = FactoryBot.build(:user)
      valid = [
        Domain.new(name: "https://news.ycombinator.com", description: "hacker news", user_id: u.id),
        Domain.new(name: "https://www.pitchfork.com/latest", description: "music news", user_id: u.id),
        Domain.new(name: "https://www.mountainproject.com/area/105833381/yosemite-national-park", description: "yosemite!", user_id: u.id),
      ]
      parsed_valid = ["ycombinator.com", "pitchfork.com", "mountainproject.com"]
      invalid = [
        Domain.new(name: "https://applicationjson", description: "hacker news", user_id: u.id),
        Domain.new(name: "https://x/latest", description: "music news", user_id: u.id),
        Domain.new(name: "https://.com/area", description: "yosemite!", user_id: u.id),
      ]
  
      it "should parse valid domains" do
        valid.each_with_index do |valid_domain, idx|
          valid_domain.parse_domain
          expect(valid_domain.name).to eq(parsed_valid[idx])
        end
      end
  
      it "should raise an error if it given an invalidly formatted domain" do
        invalid.each do |invalid_domain|
          expect { invalid_domain.parse_domain; p invalid_domain.name }.to raise_error("Not a valid domain!")
        end
      end
    end
  
    context "#check_if_valid_domain" do
      u = FactoryBot.build(:user)
      valid = [
        Domain.new(name: "https://news.ycombinator.com", description: "hacker news", user_id: u.id),
        Domain.new(name: "https://www.pitchfork.com/latest", description: "music news", user_id: u.id),
        Domain.new(name: "https://www.mountainproject.com/area/105833381/yosemite-national-park", description: "yosemite!", user_id: u.id),
      ]
      invalid = [
        Domain.new(name: "http://www.home.clom", description: "hacker news", user_id: u.id),
        Domain.new(name: "http://x.blah/latest", description: "music news", user_id: u.id),
        Domain.new(name: "http://www.job.clom/area", description: "yosemite!", user_id: u.id),
      ]
  
      it "should return true if the domain has a valid IP address" do
        valid.each_with_index do |valid_domain, idx|
          valid_domain.parse_domain
          expect(valid_domain.check_if_valid_domain).to eq(true)
        end
      end
  
      it "should return false if the domain doesn't have a valid IP address" do
        invalid.each_with_index do |invalid_domain, idx|
          invalid_domain.parse_domain
          expect(invalid_domain.check_if_valid_domain).to eq(false)
        end
      end
    end
  end

end
