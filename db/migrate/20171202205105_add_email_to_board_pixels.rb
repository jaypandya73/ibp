class AddEmailToBoardPixels < ActiveRecord::Migration[5.1]
  def change
    add_column :board_pixels, :email, :string
    add_index :board_pixels, :email
  end
end
