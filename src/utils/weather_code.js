const request = require('postman-request')
require('dotenv').config()

const forecast = (latitude, longitude, callback) => {
    const weatherAPIKey = process.env.WEATHER_API_KEY
    const url = `http://api.weatherstack.com/current?access_key=${weatherAPIKey}&query=${latitude},${longitude}&units=f`

    request({ url: url, json:true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!')
        } else if (response.body.success === 'false') {
            callback(response.body.error.info)
        } else {
                let forecast = {
                    weather_icon: response.body.current.weather_icons[0],
                    weather_description: response.body.current.weather_descriptions[0],
                    location: response.body.request.query,
                    temp: response.body.current.temperature,
                    feelslike: response.body.current.feelslike,
                    precip: response.body.current.precip
                }

            callback(undefined, forecast)
        }
    })
}

module.exports = forecast