const gasify = require('./utils/gasify.js')

gasify('LOCATION PLACEHOLDER', (error, response) => {
    if (error || response == undefined) {
        console.log(error)
    } else {

        let stations = []

        response.forEach((station) => {
            var injectData = {
                station_name : station.name,
                station_address: station.vicinity,
                station_rating : station.rating,
                price_level : station.price_level,
            }
            stations.push(injectData)
        })

        console.log(stations)
    }
})