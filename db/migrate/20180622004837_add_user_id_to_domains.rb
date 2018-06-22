class AddUserIdToDomains < ActiveRecord::Migration[5.1]
  def change
    add_column :domains, :user_id, :bigint
  end
end
