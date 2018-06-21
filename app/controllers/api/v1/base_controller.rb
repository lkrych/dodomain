class Api::V1::BaseController < ApplicationController
  respond_to :json #use responders gem to make sure all controllers that inherit from the base respond with json
end