class CreateDms < ActiveRecord::Migration[7.0]
  def change
    create_table :dms do |t|

      t.timestamps
    end
  end
end
