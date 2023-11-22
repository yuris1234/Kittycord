class AddUniqueFriend < ActiveRecord::Migration[7.0]
  def change
    remove_index :friends, :friended
    remove_index :friends, :friender
    add_index :friends, [:friender, :friended], unique: true
  end
end
