class CreateBoardPixels < ActiveRecord::Migration[5.1]
  def change
    create_table :board_pixels do |t|
      t.string :image
      t.string :website
      t.integer :side_x, default: 0
      t.integer :top_y, default: 0
      t.integer :width, default: 20
      t.integer :height, default: 20
      t.boolean :active, default: false
      t.integer :status, default: 0
      t.text :reserved_pixels

      t.timestamps
    end
  end
end
