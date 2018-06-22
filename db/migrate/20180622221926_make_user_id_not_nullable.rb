class MakeUserIdNotNullable < ActiveRecord::Migration[5.1]
  def change
    change_column :domains, :user_id, :bigint, null: false
  end
end
