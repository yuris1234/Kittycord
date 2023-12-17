class CreateFriendRequests < ActiveRecord::Migration[7.0]
  def change
    create_table :friend_requests do |t|
      t.bigint :friender, null: false 
      t.bigint :friended, null: false
      t.string :status, null: false, default: "pending"
      t.timestamps
    end
    add_index :friend_requests, [:friender, :friended], unique: true
    add_index :friend_requests, :friended
    add_foreign_key :friend_requests, :users, column: :friender
    add_foreign_key :friend_requests, :users, column: :friended
  end
end
