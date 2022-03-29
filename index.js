const gasify = require('./utils/gasify.js')

gasify('ENTER LOCATION', (error, response, optimalStation) => {
    if (error || response == undefined) {
        console.log(error)
    } else {
        console.log(response.place_name)
        // console.log(optimalStation)
        // optimalStation needs to be setup in gasify algorithm.
    }
})