class DataController < ApplicationController
  def index
    response = Excon.get("http://hapi.fhir.org/baseR4/Patient?birthdate=gt1950-01-01&_format=json&_pretty=false")
    render :json => {
        data: response.body.encode("UTF-8")
      }
  end
end
