class PostSerializer < ActiveModel::Serializer
  attributes :id, :created, :clicks, :ended, :image, :impressions, :pdf, :spend, :targeting, :text, :url, :created_at
end


