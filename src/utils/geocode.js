const fs = require('fs')

const request = require('postman-request')

const rawData = fs.readFileSync('config.json')
const config = JSON.parse(rawData)

const geocode = (location, callback) => {
  const geocode_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=' + config.api_authentication.mapbox_apikey + '&limit=1'

  request({url: geocode_url, json: true}, (err, res) => {
    if (err) {
      const geocode_error = err
      callback('GEOCODE ERROR: ' + geocode_error, undefined)
    } else if (res.body.error) {
      const geocode_error = res.body.error
      callback('GEOCODE ERROR: ' + geocode_error, undefined)
    } else if (res.body.features.length == 0) {
      const geocode_error = 'No coordinates found. Try another location.'
      callback(geocode_error, undefined)
    } else {
      const geocode_data = {
        "location": res.body.features[0].place_name,
        "latitude": res.body.features[0].center[1],
        "longitude": res.body.features[0].center[0]
      }
      callback(undefined, geocode_data)
    }
  })
}

module.exports = geocode