path = File.expand_path '../', __FILE__

require "#{path}/config/env.rb"

class BitcoinExchange < Sinatra::Base
  include Voidtools::Sinatra::ViewHelpers

end

require_all "#{path}/routes"
