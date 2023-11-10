class EditUsersStatus < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :status
    add_column :users, :status, :string, null: false, default: 'offline'
  end
end
