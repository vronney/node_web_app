const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/weather_code')
const hbs = require('hbs')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

const publicDirectory = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../views/partials')

// static page display
// display index.html, about.html, help.html - similar to app.get('/', ...)
app.use(express.static(publicDirectory))

// Setup hbs config directory
app.set('views', path.join(__dirname, '../views/templates'))
// assigning template as hbs
app.set('view engine', 'hbs')
// partials are being rendered
hbs.registerPartials(partialsPath)

// helper that will add class "active" to nav-link if on current path
hbs.registerHelper("if", function(string1 ,string2, options) {
    if (string1 === string2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
})

// Home
app.get('/', (req, res) => {
    res.render('weather', {
        path: '/',
        title: 'Weather',
        name: "Ron Vargas"
    })
})

// About
app.get('/about', (req, res) => {
    res.render('about', {
        path: 'about',
        title: 'Welcome to the About Page!',
        name: 'Ron Vargas'
    })
})

// Help
app.get('/help', (req, res) => {
    res.render('help', {
        path: 'help',
        title: 'Help Page',
        message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        name: "Ron Vargas"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })        
    } 

    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({error: error})
        } else {
            forecast(data.latitude, data.longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
    
                res.send({
                    temp: forecastData.temp,
                    weather_icon: forecastData.weather_icon,
                    precip: forecastData.precip,
                    weather_description: forecastData.weather_description,
                    feelslike: forecastData.feelslike,
                    location: data.location,
                    address: req.query.address
                })
            })
        }        
    })
})

// Help wild card
app.get('/help/*', (req, res) => {
    res.render('help-404', {
        name: "Ron Vargas"
    })
})

// Wild card 
app.get('*', (req, res) => {
    res.render('404', {
        name: "Ron Vargas"
    })
})

app.listen(port, () => {
    console.log(`Listening at ${port}`)
})
