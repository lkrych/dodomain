FactoryBot.define do
  factory :domain do
    name "mydomain.com"
    description "all the coolest things on the web"
    association :user, factory: :user
  end
end