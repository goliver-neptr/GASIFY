const fs = require('fs')
const path = require('path')

const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const getStations = require('./utils/getStations.js')
const getDistances = require('./utils/getDistances.js')
const findOptimals = require('./utils/findOptimals.js')

const rawData = fs.readFileSync('config.json')
const config = JSON.parse(rawData)

// define paths
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

// express & hbs setup
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirPath))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'GASIFY - Your Gasoline App.'
    })
})

app.get('/endpoint', (req, res) => {
    console.log(req.query)
    if (!req.query.location) {
        return res.send({
            results: {},
            error: 'No location was provided. Please enter a valid location.'
        })
    }

    geocode(req.query.location, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                results: {},
                error
            })
        }

        getStations(latitude, longitude, (error, preStations) => {
            if (error) {
                return res.send({
                    results: {},
                    error
                })
            }

            getDistances(preStations, (error, stations) => {
                if (error) {
                    return res.send({
                        results: {},
                        error
                    })
                }

                findOptimals(stations, (error, optimalStations) => {

                    if (error) {
                        return res.send({
                            results: {},
                            error
                        })
                    }
                    res.send({
                        results: {
                            client_Data: [{
                                latitude,
                                longitude,
                                location
                            }],
                            stations,
                            optimalStations
                        },
                        error: undefined
                    })
                })
            })

        })

    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found.'
    })
})

app.listen(config.port, () => {
    console.log('Server running on port ' + config.port + '.')
})