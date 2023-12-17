class EditFriends < ActiveRecord::Migration[7.0]
  def change
    drop_table :friends
    create_table :friends do |t|
      t.bigint :friend_1, null: false
      t.bigint :friend_2, null: false
      t.timestamps
    end
    add_index :friends, [:friend_1, :friend_2], unique: true
    add_index :friends, :friend_2
    add_foreign_key :friends, :users, column: :friend_1
    add_foreign_key :friends, :users, column: :friend_2
  end
end
