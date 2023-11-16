class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.string :body, null: false
      t.bigint :author_id, null: false
      t.references :messageable, polymorphic: true, index: true
      t.timestamps
    end
  end
end
