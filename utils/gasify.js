const request = require('postman-request')
const fs = require('fs')
const { Console } = require('console')

const rawConfig = fs.readFileSync('config.json')
const config = JSON.parse(rawConfig)

const gasify = (address, callback) => {
  const geocode_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + config.api_authentication.mapbox_apikey + '&limit=1'

  request({ url: geocode_url, json: true }, (error, response) => {
    if (error) {
      const geocode_error = error
      callback('GEOCODE ERROR: ' + geocode_error, undefined)
    } else if (response.body.error) {
      const geocode_error = response.body.error
      callback('GEOCODE ERROR: ' + geocode_error, undefined)
    } else if (response.body.features.length === 0) {
      const geocode_error = 'NO LOCATION FOUND.'
      callback('GEOCODE ERROR: ' + geocode_error, undefined)
    } else {
      const geocode_data = {
        "place_name": response.body.features[0].place_name,
        "latitude": response.body.features[0].center[1],
        "longitude": response.body.features[0].center[0]
      }

      // testing and debugging
      console.log('----------------------------')
      console.log('LAT: ' + geocode_data.latitude)
      console.log('LONG: ' + geocode_data.longitude)
      console.log('LOCATION: ' + geocode_data.place_name)
      console.log('----------------------------')

      const gplaces_url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?rankby=prominence&radius=5000&keyword=gas&location=' + geocode_data.latitude + ',' + geocode_data.longitude + '&type=gas_station&key=' + config.api_authentication.google_apikey
      
      request({ url: gplaces_url, json: true }, (error, response) => {

        if (error) {
          const gplaces_error = error
          callback('GPLACES ERROR: ' + gplaces_error, undefined)
        } else if (response.body.results.length == 0 || response.body.status == "ZERO_RESULTS") {
          const gplaces_error = 'ZERO GAS STATION RESULTS.'
          callback('GPLACES ERROR: ' + gplaces_error, undefined)
        } else {
          callback(undefined, response.body.results)
        }
      })
    }
  })
}

module.exports = gasify