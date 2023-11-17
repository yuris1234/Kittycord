class CreateServers < ActiveRecord::Migration[7.0]
  def change
    create_table :servers do |t|
      t.bigint :owner_id, null: false
      t.timestamps
    end
    add_foreign_key :servers, :users, column: :owner_id
  end
end
