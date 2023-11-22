class CreateMembershipJoins < ActiveRecord::Migration[7.0]
  def change
    create_table :membership_joins do |t|
      t.bigint :user_id, null: false
      t.references :membership, polymorphic: true, null: false, index: true
      t.timestamps
    end
  end
end
