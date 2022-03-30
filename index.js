const gasify = require('./utils/gasify.js')

gasify('LOCATION PLACEHOLDER', (error, response) => {
    if (error || response == undefined) {
        console.log(error)
    } else {

        let stations = []

        response.forEach((station) => {

            // TRY MAKING API REQUEST TO GET DISTANCE HERE
            // also clean up this funciton, combine into gasify function

            var injectData = {
                station_name : station.name,
                station_address: station.vicinity,
                station_rating : station.rating,
                price_level : station.price_level,
            }
            stations.push(injectData)
        })

        console.log(stations)
        const maxRating = stations.reduce((prev, current) => (prev.station_rating > current.station_rating) ? prev : current)

        // const lowPLevel = stations.reduce((prev, current) => ((prev.price_level < current.price_level)) ? prev : current)

        console.log(maxRating)
        // console.log(lowPLevel)
    }
})