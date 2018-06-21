class CreateDomains < ActiveRecord::Migration[5.1]
  def change
    create_table :domains do |t|
      t.string :name, null: false, default: ""
      t.text :description, null: false

      t.timestamps
    end
    add_index :domains, :name,                unique: true
  end
end
