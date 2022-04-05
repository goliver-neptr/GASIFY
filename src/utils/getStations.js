const fs = require('fs')

const request = require('postman-request')

const rawData = fs.readFileSync('config.json')
const config = JSON.parse(rawData)

const getStations = (latitude, longitude, callback) => {
  const gplaces_url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?rankby=prominence&radius=5000&keyword=gas&location=' + latitude + ',' + longitude + '&type=gas_station&key=' + config.api_authentication.google_apikey

  request({ url: gplaces_url, json: true }, (error, response) => {

    if (error) {
      const gplaces_error = error
      callback('GPLACES ERROR: ' + gplaces_error, undefined)
    } else if (response.body.results.length == 0 || response.body.status == "ZERO_RESULTS") {
      const gplaces_error = 'No stations found. Please try another location.'
      callback('GPLACES ERROR: ' + gplaces_error, undefined)
    } else {

      let stations = []
      
      response.body.results.forEach((station) => {
        let injectData = {
          station_name: station.name,
          station_address: station.vicinity,
          station_id: station.place_id,
          station_rating: station.rating,
          station_price_level: station.price_level
        }
        stations.push(injectData)
      })
      
      callback(undefined, stations)
    }
  })
}

module.exports = getStations