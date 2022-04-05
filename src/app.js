const fs = require('fs')
const path = require('path')

const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const getStations = require('./utils/getStations.js')
const getDistances = require('./utils/getDistances.js')
const findOptimal = require('./utils/findOptimal.js')

// define paths
const publicDirPath = path.join(__dirname, '../pubic')
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

        res.send({
          results: {
            client_Data: [{
              latitude,
              longitude,
              location
            }],
            stations
          },
          error: undefined
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

app.listen(3000, () => {
  console.log('Server running on port 3000.')
})