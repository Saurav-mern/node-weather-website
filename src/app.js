const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()

const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, "../public")));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Saurav Singh'
    })
})

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Saurav Singh",
  });
});

app.get('/help', (req, res) =>{
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Saurav Singh'
    })
})


app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(req.query.address, (error, { Latitude, Longitude, Location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(Latitude, Longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        Forecast: forecastData,
        Location,
        Address: req.query.address,
      });
    });
  });
});



app.get('/help/*', (req, res) => {
    res.render("404", {
      title: "404",
      name: "Saurav Singh",
      errorMessage: "Help article not found",
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Saurav Singh',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, ()=> {
    console.log('Server is up on port 3000')
})