const fs = require('fs')

const request = require('postman-request')
const converter = require('length-distance-converter')

const rawData = fs.readFileSync('config.json')
const config = JSON.parse(rawData)

const getDistances = (preStations, callback) => {
	let stations = []

	preStations.forEach((station) => {
		stations.push(
			new Promise((resolve) => {
				const gdmatrix_url = 'https://maps.googleapis.com/maps/api/distancematrix/json?&origins=' + station.client_latitude + ',' + station.client_longitude + '&destinations=place_id:' + station.station_id + '&key=' + config.api_authentication.google_apikey

				request({ url: gdmatrix_url, json: true }, (err, res) => {
					if (err) {
						const gdmatrix_error = err
						callback('GDMatrix Error: ' + gdmatrix_error, undefined)
					} else if (res.body.destination_addresses.length == 0 && res.body.status == "INVALID_REQUEST") {
						const gdmatrix_error = 'No distance results. Invalid destinations. Try another search.'
						callback('GDMatrix Error: ' + gdmatrix_error, undefined)
					} else {
						const stationInjectData = {
							station_name: station.station_name,
							station_address: station.station_address,
							station_street_name: station.station_street_name,
							station_rating: station.station_rating,
							price_level: station.station_price_level,
							distance: converter.kmToMiles(parseFloat(res.body.rows[0].elements[0].distance.text)), // kilometers
							time: parseFloat(res.body.rows[0].elements[0].duration.text) // mins
						}
						resolve(stationInjectData)
					}
				})
			})
		)
	})

	Promise.all(stations).then((stations) => {
		callback(undefined, stations)
	});

}

module.exports = getDistances