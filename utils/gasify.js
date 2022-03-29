const request = require('postman-request')
const fs = require('fs')

const rawConfig = fs.readFileSync('config.json')
const config = JSON.parse(rawConfig)

const gasify = (address, callback) => {
    const geocode_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + config.api_authentication.mapbox_apikey + '&limit=1'

    request({ url: geocode_url, json: true }, (error, response) => {
        if (error) {
            const geocode_error = error
            callback('GEOCODE ERROR: ' + geocode_error, undefined, undefined)
        } else if (response.body.error) {
            const geocode_error = response.body.error
            callback('GEOCODE ERROR: ' + geocode_error, undefined, undefined)
        } else if (response.body.features.length === 0) {
            const geocode_error = 'No location found.'
            callback('GEOCODE ERROR: ' + geocode_error, undefined, undefined)
        } else {
            const geocode_data = {
                "place_name" : response.body.features[0].place_name,
                "latitude" : response.body.features[0].center[1],
                "longitude" : response.body.features[0].center[0]
            }

            console.log('LAT: ' + geocode_data.latitude)
            console.log('LONG: ' + geocode_data.longitude)
            
            const gplaces_url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=gas&location=' + geocode_data.latitude + ',' + geocode_data.longitude + '&radius=5000&type=gas_station&key=' + config.api_authentication.google_apikey

            request({ url: gplaces_url, json: true }, (error, response) => {
                
                let sugguested = []

                const data = response.body.results
                data.forEach((item) => {
                    // console.log(item.name + ' | ' + item.vicinity)

                    const gdmatrix_url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + geocode_data.latitude + ',' + geocode_data.longitude + '&destinations=place_id:' + item.place_id + '&key=' + config.api_authentication.google_apikey

                    console.log(gdmatrix_url)

                    request({ url: gdmatrix_url, json: true }, (error, response) => {
                        if (error) {
                            console.log(error)
                        }
                        console.log(item.name + ' | ' + response.body.rows[0].elements[0].distance.text + ' | ' + response.body.rows[0].elements[0].duration.text)
                    })

                })
            })

        }
    })

}

module.exports = gasify