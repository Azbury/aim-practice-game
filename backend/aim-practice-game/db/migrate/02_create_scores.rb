class CreateScores < ActiveRecord::Migration[6.0]
    def change
        create_table :scores do |t|
            t.integer :points
            t.timestamps null: false
        end
    end
end