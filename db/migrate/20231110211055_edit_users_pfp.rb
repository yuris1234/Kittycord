class EditUsersPfp < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :pfp_url
    add_column :users, :pfp_url, :string, default: "/unknown.png"
  end
end
