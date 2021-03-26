class DataController < ApplicationController
  def index
    # response = Excon.get("")
    # render :json => {
    #     data: response.body
    #   }
    render :json => {
      data: "HI IM HERE"
    }
  end
end
