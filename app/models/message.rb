class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :content, presence: true
end

mount_uploader :image, ImageUploader