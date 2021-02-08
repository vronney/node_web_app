const weatherForm = document.querySelector('form')
const searchEl = document.querySelector('input')
const weatherIcon = document.querySelector('.weather-icon')
const city = document.querySelector('.city')
const forecast = document.querySelector('.forecast')
const weatherDescription = document.querySelector('.weather-description')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchEl.value
    weatherIcon.textContent = ''
    weatherDescription.textContent = ''
    city.textContent = 'Loading...'
    forecast.textContent = ''

    // fetching weather information
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                city.textContent = data.error
            } else {
                weatherIcon.innerHTML = `<img src="${data.weather_icon}" style="height: 100px; width: 100px;" alt="Weather Icon">`
                city.textContent = data.location
                weatherDescription.textContent = data.weather_description
                forecast.innerHTML = `
                    <p>The current temperature is ${data.temp}°</p>
                    <p>Feelslike ${data.feelslike}°</p>
                    <p>There is a ${data.precip}% chance of rain</p>
                    `
                searchEl.value = ''
            }
        })
    })
})
