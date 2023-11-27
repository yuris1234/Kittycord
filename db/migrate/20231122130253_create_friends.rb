class CreateFriends < ActiveRecord::Migration[7.0]
  def change
    create_table :friends do |t|
        t.bigint :friender, null: false
        t.bigint :friended, null: false
        t.string :status, null: false 
      t.timestamps
    end
    add_index :friends, :friender 
    add_index :friends, :friended
    add_foreign_key :friends, :users, column: :friender
    add_foreign_key :friends, :users, column: :friended 
  end
end
