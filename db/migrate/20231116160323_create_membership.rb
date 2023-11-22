class CreateMembership < ActiveRecord::Migration[7.0]
  def change
    create_table :memberships do |t|
      t.bigint :user_id, null: false
      t.references :membership, null: false, index: true, polymorphic: true
      t.timestamps
    end
  end
end
