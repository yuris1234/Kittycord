class EditServersChannels < ActiveRecord::Migration[7.0]
  def change
    add_column :servers, :name, :string, default: "server"
    add_column :channels, :name, :string, default: "general"
  end
end
