const gasify = require('./utils/gasify.js')
const fs = require('fs')
const request = require('postman-request')
const rawConfig = fs.readFileSync('config.json')
const config = JSON.parse(rawConfig)

gasify('94 Bourbon St', (error, response, geocode_data) => {
  if (error || response == undefined) {
    console.log(error)
  } else {
    let stations = []

    response.forEach((station) => {
      var injectData = {
        station_name: station.name,
        station_address: station.vicinity,
        station_rating: station.rating,
        price_level: station.price_level
      }

      stations.push(injectData)
    })

    console.log(stations)
    const maxRating = stations.reduce((prev, current) => (prev.station_rating > current.station_rating) ? prev : current)

    console.log(maxRating)
  }
})