class DataController < ApplicationController
  def index
    response = Excon.get("http://hapi.fhir.org/baseR4/Patient?birthdate=gt1950-01-01&_format=json&_pretty=false")
    parsed = response.body.force_encoding("utf-8")
    render :json => {
        data: parsed
      }
  end
end
