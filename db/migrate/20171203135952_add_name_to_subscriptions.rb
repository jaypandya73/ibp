class AddNameToSubscriptions < ActiveRecord::Migration[5.1]
  def change
    add_column :subscriptions, :name, :string
  end
end
