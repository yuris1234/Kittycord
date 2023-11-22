class CreateChannels < ActiveRecord::Migration[7.0]
  def change
    create_table :channels do |t|
      t.bigint :server_id, null: false
      t.timestamps
    end
    add_foreign_key :channels, :servers, column: :server_id
  end
end
