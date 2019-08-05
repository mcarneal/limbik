class Api::V1::PostsController < ApplicationController


  def index
    start = params['_limit'].to_i * params['_page'].to_i - params['_limit'].to_i
    endpoint = params['_limit'].to_i * params['_page'].to_i - 1
      @posts = Post.all
      render json: @posts[start..endpoint]
  end

end
