require 'rails_helper'

RSpec.describe User, type: :model do

  context "associations" do
    it "A user can have many domains" do

      u = FactoryBot.create(:user)
      d = FactoryBot.create(:domain, user_id: u.id)
      d = FactoryBot.create(:domain, name: "anothergreatdomain.com", user_id: u.id )
      expect(u.domains.count).to be(2) 
    end

    it "A user doesn't have to have a domain" do
      u = FactoryBot.build(:user)
      expect(u.domains.count).to be(0)
    end
  end

  context "validations" do
    context "email validations" do

      it "a user should have an email when being created" do
        expect { User.create!(password: "password") }.to raise_error(ActiveRecord::RecordInvalid)   
      end

      it "the email should be unique" do
        FactoryBot.create(:user)
        expect { User.create!(email: "firstuser@gmail.com", password: "password") }.to raise_error(ActiveRecord::RecordInvalid)   
      end

      it "the email should be properly formatted" do
        expect { User.create!(email: "improper.^3@.comrly", password: "password") }.to raise_error(ActiveRecord::RecordInvalid)   
      end

    end
    context "password validations" do
      it "the password should be between the length of 6 or 20" do
        #short password
        expect { User.create!(email: "firstuser@gmail.com", password: "p") }.to raise_error(ActiveRecord::RecordInvalid)   
        #long password
        expect { User.create!(email: "firstuser@gmail.com", password: "p" * 21) }.to raise_error(ActiveRecord::RecordInvalid)   
      end
    end
  end

  context "callbacks" do
    context "before saving the user" do
      it "should encrypt the password and generate a salt" do
        u = User.new(email: "newuser@gmail.com", password: "password" )
        expect(u.password_digest).to_not be_present
        expect(u.salt).to_not be_present
        u.save
        expect(u.password_digest).to be_present
        expect(u.salt).to be_present

      end
    end

    context "after saving the user" do
      it "should remove the plaintext password from the user model" do
        u = User.new(email: "newuser@gmail.com", password: "password" )
        expect(u.password).to eq("password")
        u.save
        expect(u.password).to be(nil)
      end
    end
  end

  context "methods" do
    context "#encrypt_password" do
      it "should encrypt a password" do
        u = User.new(email: "newuser@gmail.com", password: "password" )
        expect(u.password_digest).to_not be_present
        expect(u.salt).to_not be_present
        u.encrypt_password
        expect(u.password_digest).to be_present
        expect(u.salt).to be_present
        expect(u.password).to be_present

      end
    end

    context "#clear_password" do
      it "should set password to nil" do
        u = User.new(email: "newuser@gmail.com", password: "password" )
        expect(u.password).to be_present
        u.clear_password
        expect(u.password).to_not be_present
      end
    end

    context "#match_password" do
      before(:each) do
        @u = FactoryBot.create(:user)
      end
      it "should return a true for a correctly matched password" do
        expect(@u.match_password("password")).to be(true)
      end

      it "should return false for an incorrectly matched password" do
        expect(@u.match_password("invalid_password")).to be(false)
      end
    end
  end

end