const findOptimals = (stations, callback) => {
    const maxRating = stations.reduce((prev, current) => (prev.station_rating > current.station_rating) ? prev : current)
    const lowDistance = stations.reduce((prev, current) => (prev.distance < current.distance) ? prev : current)
    const lowTime = stations.reduce((prev, current) => (prev.time < current.time) ? prev : current) 
    
    const optimalStations = {
        maxRating,
        lowDistance,
        lowTime
    }

    callback(undefined, optimalStations)
}

module.exports = findOptimals