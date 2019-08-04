class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts, :id => false do |t|
      t.integer :clicks
      t.string :created
      t.string :ended
      t.integer :id
      t.string :image
      t.integer :impressions
      t.string :pdf
      t.string :spend
      t.string :targeting
      t.string :text
      t.string :url

      t.timestamps
    end
  end
end
