class Domain < ApplicationRecord
  #add association
  belongs_to :user
  #add validations

  def self.search(query)
    where("name LIKE ? ", "%#{query}%")
  end
end
