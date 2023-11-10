class EditUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :status, :string, null: false, default: "Offline"
    add_column :users, :pfp_url, :string, null: false, default: ""
  end
end
