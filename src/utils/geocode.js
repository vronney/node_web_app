const request = require('postman-request')
require('dotenv').config();

const geocode = (address, callback) => {
    const mapboxAPIKey = process.env.MAP_BOX_API_KEY
    const mapboxURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxAPIKey}&limit=1`

    request({ url: mapboxURL, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to loaction services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode