require 'rails_helper'

RSpec.describe User, type: :model do

  context "associations" do
    context "A user can have many domains" do
    end

    context "A user doesn't have to have a domain" do
    end
  end

  context "validations" do
    context "email validations" do
    end
    context "password validations" do
    end
  end

  context "callbacks" do
    context "before saving the user" do
    end

    context "after saving the user" do
    end
  end

  context "methods" do
    context "#encrypt_password" do
    end

    context "#clear_password" do
    end

    context "#match_password" do
    end
  end

end