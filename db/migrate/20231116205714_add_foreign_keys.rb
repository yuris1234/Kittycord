class AddForeignKeys < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :messages, :users, column: :author_id
    add_foreign_key :membership_joins, :users
  end
end
